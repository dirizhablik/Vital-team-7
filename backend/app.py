from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import joblib
from werkzeug.utils import secure_filename
import os
from stone import process
from colormath.color_objects import sRGBColor, LabColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000

monk_hex_colors = [
    '#f9ede2', '#f1dbb4', '#e1c18d', '#c9a27a', '#a8775f',
    '#8b5c49', '#6f4338', '#553026', '#3a1d17', '#1f0e08'
]

def hex_to_lab(hex_color):
    rgb = sRGBColor.new_from_rgb_hex(hex_color)
    return convert_color(rgb, LabColor)

def find_closest_monk_tone(hex_color):
    input_lab = hex_to_lab(hex_color)
    distances = [delta_e_cie2000(input_lab, hex_to_lab(mhex)) for mhex in monk_hex_colors]
    closest_index = distances.index(min(distances))
    return closest_index + 1

# results = process("./pic.png")  # Test line removed
app = Flask(__name__)
CORS(app)  # позволяет React обращаться к Flask

with open('decisiontree1.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json

    spo2 = data.get('spo2')
    gender_raw = data.get('gender', '').lower()
    gender = 1 if gender_raw == 'male' else 0
    skin_tone = data.get('skinTone')
    age = data.get('age')
    height = data.get('height')
    weight = data.get('weight')
    temperatue = data.get('temperature')
    blood_pressure = data.get('bloodPressure')
    respiratory = data.get('respiratory')
    pulse = data.get('pulse')


    if spo2 is None or skin_tone is None:
        return jsonify({'status': 'error', 'message': 'Missing fields'}), 400

    if skin_tone in [3, 4]:
        skin_color_group = 0
    elif skin_tone in [5, 6]:
        skin_color_group = 1
    elif skin_tone in [7, 8]:
        skin_color_group = 2
    else:
        skin_color_group = -1

    data2 = {
        'spo2': [spo2],
        'age': [age],
        'Heart rate': [pulse],
        'Body temperature': [temperatue],
        'Body weight': [weight],
        'Body height': [height],
        'skin_tone_group': [skin_color_group],
        'Blood pressure device Cuff pressure.mean': [blood_pressure],
        'Respiratory rate': [respiratory],
        'gender_MALE': [gender]
    }
    
    df = pd.DataFrame(data2)
    
    prediction = model.predict(df)[0]

    result = {
        'predicted_spo2': prediction,
        'message': f"Predicted SpO₂ level is {prediction}%",
        'gender': gender,
        'skin_color_group': skin_color_group
    }

    return jsonify(result)

@app.route('/detect_skin_tone', methods=['POST'])
def detect_skin_tone():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    filename = secure_filename(image.filename)
    save_path = os.path.join('uploads', filename)
    os.makedirs('uploads', exist_ok=True)
    image.save(save_path)

    try:
        result = process(save_path)
        face = result['faces'][0]
        hex_color = face.get('skin_tone', '#ffffff')
        tone_label = face.get('tone_label', '')
        monk_index = find_closest_monk_tone(hex_color)

        return jsonify({
            'skinTone': monk_index,
            'hex': hex_color,
            'label': tone_label
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5050)