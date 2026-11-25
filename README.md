# 한자 카메라

카메라로 비추면 한자 위에 중국어 병음과 한국 한자음을 바로 띄워 주는 웹앱. 줄을 누르면 훈음·단어 뜻·발음 듣기.

- 인식: PaddleOCR PP-OCRv4 (onnxruntime-web, 휴대폰 안에서 실행)
- 병음: pinyin-pro / 간체→번체: opencc-js
- 훈음·한자어: libhangul hanja.txt (LGPL-2.1)
- 뜻: HSK 1~3급 단어·여행/메뉴 단어 한국어 뜻 직접 작성, 나머지는 CC-CEDICT 영어 뜻 (CC BY-SA 4.0)
