# UI·UX 프로그래밍

주차별 페이지와 작업 범위입니다. GitHub Pages 주소는 배포 경로이며, 로컬 파일이 현재 공개 배포와 일치하는지는 각 페이지에서 확인해 주세요.

| 주차 | 내용 | 저장소 파일 | GitHub Pages |
| --- | --- | --- | --- |
| 1주차 | 첫 웹 페이지 | [week1](week1/) | [페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week1/) |
| 2주차 | 발표 훈련 서비스 소개 | [week2](week2/) | [페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week2/) |
| 3주차 | 발표 훈련 서비스 화면 | [week3](week3/) | [페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week3/) |
| 4주차 | 화면 스타일과 구성 | [week4](week4/) | [페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week4/) |
| 5주차 | 신청 상호작용 | [week5](week5/) | [페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week5/) |
| 6주차 | 데브리허설 이벤트 처리와 동적 UI | [기록](week6/README.md) · [코드](week6/) | [페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week6/) |
| 7주차 | 데브리허설 사용자 흐름과 인터랙션 | [기록](week7/README.md) · [코드](week7/) | [페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week7/) |
| 중간시험 (8주차) | 데브플랜 | [구현 및 테스트 기록](midterm/README.md) · [코드](midterm/) | [페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/midterm/) |
| 9주차 | 폼 UI 입력 경험 | [week9](week9/) · [테스트 페이지](week9/tests.html) | [배포 경로](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week9/) · [테스트 페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week9/tests.html) |
| 10주차 | 내비게이션 정보 구조 | [week10](week10/) · [테스트 페이지](week10/tests.html) | [배포 경로](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week10/) · [테스트 페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week10/tests.html) |
| 11주차 | 접근성 (1차시) | [week11](week11/) · [테스트 페이지](week11/tests.html) | [배포 경로](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week11/) · [테스트 페이지](https://el-psy-kongroo-d.github.io/iscu-ui-ux-programming/week11/tests.html) |

9~11주차는 공개 강의 코드에 기존 중간시험의 데브플랜 주제를 적용한 구현입니다. LMS 상세 조건과 영상의 직접 대조는 미완료이며, 11주차는 공개 원본의 1차시 범위입니다. 12~14주차는 LMS 콘텐츠 개발 중으로 작업을 보류합니다. 제공한 검사 페이지는 jsdom에서 실행했으며, 실제 브라우저 화면 배치와 키보드 조작은 아직 검증하지 못했습니다.

## 기존 주차 원본 대조

| 범위 | 대조 내용 |
| --- | --- |
| 1~2주차 | 1주차는 텍스트 공백·띄어쓰기 차이만 있습니다. 2주차는 이미지 경로 오류와 문구 오타를 고쳤으며, 기존 이미지 파일은 사용자 자산일 수 있어 원본과 달라도 보존했습니다. |
| 3~5주차 | 각 주차 HTML·CSS·JavaScript가 공개 강의 원본과 바이트 단위로 일치합니다: [3주차](https://github.com/boracles/uiuxprogramming/tree/2cae4c7), [4주차](https://github.com/boracles/uiuxprogramming/tree/647874a), [5주차](https://github.com/boracles/uiuxprogramming/tree/222d745). |
| 6~7주차 | [6주차 원본](https://github.com/boracles/uiuxprogramming/tree/c92584097424072e1bec630c689e9dd5422d7fb2)은 CSS가 일치하며 HTML·JavaScript는 개인화했습니다. [7주차 CSS 원본](https://github.com/boracles/uiuxprogramming/tree/90a4aac98f6ac50d34e298125b694f510ff8ad00)은 CSS가 일치하고 HTML·JavaScript는 개인화했습니다. 7주차 전체 JavaScript 원본을 찾지 못했고, 영상과 직접 대조하지 않았습니다. 상세 기록: [6주차](week6/LECTURE_COMPARISON.md), [7주차](week7/LECTURE_COMPARISON.md). |
| 중간시험 (8주차) | 원본 동일성보다 계획 추가·조회·취소 등 개인화된 기능을 구현했습니다. 기존 README의 31개 브라우저 검사 기록은 [중간시험 기록](midterm/README.md)에 있습니다. |

## 과제로서 자체 검토

주차별 핵심 동작과 중간시험에서 정한 개발 학습 계획 서비스의 주제는 이어집니다. 자체 리뷰에서는 입력·설정·저장·조회가 끝까지 연결되는지와 오류 후 복구, 키보드 초점, 주차별 학습 목표를 확인했습니다. 제출 요건 충족 여부는 LMS 상세 조건과 영상 대조 후 별도로 판단해야 합니다.

| 검토 항목 | 반영 내용 |
| --- | --- |
| 9주차 입력 경험 | 앞뒤 공백을 제거한 뒤 2~60자 검증, 오류 수정, 저장 중 수정·중복 제출 방지와 실패 후 재시도를 확인합니다. |
| 새 계획 시작 | 완료 후 상단·메뉴·빈 목록의 계획 만들기 링크로 새 입력을 시작합니다. 작성 중 이동할 때는 입력값을 보존합니다. |
| 10주차 필터 흐름 | 새 계획 저장에 성공하면 저장됨 필터로 전환해 새 항목이 보이게 합니다. 저장 실패 시 기존 필터는 유지합니다. |
| 10~11주차 키보드 초점 | 필터에서 취소·복원으로 항목이 사라지면 선택한 필터로 초점을 돌리고, 메뉴를 닫으면 목적지 제목으로 이동합니다. |
| 11주차 상태 표시 | 현재 위치·필터·취소 상태를 글자·강조로 구분합니다. 다크 모드 선택 필터의 글자 대비도 보완했습니다. |
| 검사 페이지 | 검사 전 기존 계획을 보관하고, 성공·실패·중단 시 검사 iframe을 종료한 뒤 저장값 원문을 복원합니다. |

각 주차 `tests.html`에는 입력·저장과 해당 주차의 주요 흐름을 확인하는 검사를 포함했습니다. 원본에서 달라진 부분과 11주차 1차시 한계는 각 `LECTURE_COMPARISON.md`에 기록했습니다.

## 검증 기록

2026-11-09, 최종 코드로 다음 검사를 다시 실행했습니다.

| 검사 | 결과 |
| --- | --- |
| 신규 9~11주차 DOM 동작 | 80개 통과 |
| 기존 5~7주차·중간시험 DOM 동작 | 33개 통과 |
| 제공한 `tests.html` 실행 | 9주차 23개, 10주차 19개, 11주차 23개 통과 |
| 자체 리뷰 회귀 검사 | 입력 경계·새 계획·필터·초점 26개 통과 |
| 저장 중 검사 중단 | 세 주차 모두 기존 저장값 원문 보존 |
| 정적 검사 | 외부 JS 9개·인라인 JS 4개 구문, HTML 16개 파일의 경로·ID·ARIA/label 참조, 신규 텍스트 파일 18개의 공백 검사 통과 |

동작 검사는 별도 jsdom 환경에서 실제 페이지 코드와 이벤트를 실행했습니다. 대화상자·스크롤 API는 대체 구현을 사용했으므로 실제 브라우저의 레이아웃, 네이티브 대화상자 및 키보드 조작 결과를 의미하지 않습니다. 저장소에 npm 의존성은 추가하지 않았습니다.

## 로컬 실행과 확인

저장소 루트에서 `python3 -m http.server 8000`을 실행한 뒤 `http://localhost:8000/week9/`, `/week10/`, `/week11/` 또는 각 주차의 `/tests.html`을 엽니다. JavaScript 구문은 `node --check week9/script.js`, `node --check week10/script.js`, `node --check week11/script.js`로 확인할 수 있습니다. 각 검사 페이지는 입력·저장·조회·취소와 주차별 동작의 통과·실패를 표시합니다. jsdom 검증과 실제 브라우저 검증은 구분합니다.

GitHub Pages는 `main` 브랜치를 배포 원본으로 사용합니다. 위 주소는 배포 경로이며, 코드 푸시와 LMS 과제 제출은 별개입니다. LMS 제출은 진행하지 않았습니다.
