# 한자 카메라

카메라로 비추면 한자 위에 중국어 병음과 한국 한자음을 바로 띄워 주는 웹앱. 줄을 누르면 훈음·단어 뜻·발음 듣기.

- 인식: PaddleOCR PP-OCRv4 (onnxruntime-web, 휴대폰 안에서 실행)
- 병음: pinyin-pro / 간체→번체: opencc-js
- 훈음·한자어: libhangul hanja.txt (LGPL-2.1)
