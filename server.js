const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const app = express();

// Parse incoming JSON requests
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/upload-image', async (req, res) => {
  const { image } = req.body;

  const ai = new GoogleGenAI({ apiKey: 'AIzaSyDuLT3QGuYrOmIbxTLPzFFAcDoiV3DtbFA' });
  const contents = 'Hi, can you create a rendered version of this drawing?';

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: contents,
      config: {
        responseModalities: ['Text', 'Image'],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync('generated-image.png', buffer);
        console.log('Image saved as generated-image.png');
      }
    }

    res.status(200).send({ message: 'Image generated successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Error processing image' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));