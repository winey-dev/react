# 목표

- append 버튼 클릭시 Query Box 추가
- remove 버튼 클릭시 해당 Query Box 삭제
  : 내부 값은 정상인데 re-render가 되지 않는 문제
  - 1(a), 2(b), 3(c) 에서 2 remove 버튼 클릭으로 삭제 시 1(a), 2(b) 로 보여지는 문제 (내부 데이터는 3(c) 가 맞음)
    : uuid 값과 useEffect를 통해 uuid 값이 변경 될 경우 select value를 다시 re-render 하도록 변경

## 고려 사항

Category, SubCategory Select Box를 출력
Category 변경시 SubCategoryList가 변경 되야함
SubCategory 선택시 Tag 목록이 변경 되야함

- 특정 우선순위가 존재하는 Tag 목록을 전달 받아 Select 컴포넌트가 추가 되야 한다.
  - 만약 입력받은 순서는 (app_name, container_name, \_field, namespace, pod_name) 라고 가정하면
  - 내부 정렬 로직에 의해 (item_name<\_field>, namespace, app_name, pod_name, container_name) 순으로 select 컴포넌트를 생성
- 우선순위가 높은 Select 박스에 선택된 values가 변경되면 그보다 우선순위가 낮은 Select 컴포넌트의 List가 변경 되야함
  - namespace Select 컴포넌트는 app_name Select 컴포넌트 보다 우선순의를 가지고 있다.
  - namespace의 Select 컴포넌트의 ValueList {YUDORI, YADORI} 가 존재 한다.
  - app_name의 Select 컴포넌의 ValueList {YUDORI-API-SERVER, YUDORI-CORE, YUDORI-MARIADB, YADORI-MARIADB, YADORI-APP} 으로 구성 되어 있다.
  - namespace의 Select 컴포넌트의 Value가 모두 선택 되어 있으면 app_name Select 컴포넌트의 ValueList는 {YUDORI-API-SERVER, YUDORI-CORE, YUDORI-MARIADB, YADORI-MARIADB, YADORI-APP} 이다.
  - namespace의 Select 컴포넌트의 Value로 YUDORI 만 선택 되어 있으면 app_name Select 컴포넌트의 ValueList는 {YUDORI-API-SERVER, YUDORI-CORE, YUDORI-MARIADB}
  - namespace의 Select 컴포넌트의 Value로 YADORI 만 선택 되어 있으면 app_name Select 컴포넌트의 ValueList는 {YADORI-MARIADB, YADORI-APP}
  - 만약 namespace의 Select 컴포넌트의 Value로 모든 namespace가 선택되어 있고 app_name의 Select 컴포넌트의 Value는 {YUDORI-MARIADB, YADORI-MARIADB} 선택 되어있다고 가정 할 때
  - namespace Select 컴포넌트의 Value가 YADORI 만 선택 하도록 변경되면 app_name에서 YUDORI-MARIADB는 제외 되고 YADORI-MARIADB 남아 있어야 해.
  - 이런 중첩 구조가 Tag개수만큼 모두 이루어져 있음

### 남은 문제는 
  remove 버튼이 커지는 문제... 
  : div tag로 내부 나누기 (해결)
  remove 가운데 정렬이 안됨.
  multi select에서 클릭 할 때 마다 re-render 되는 문제
  : uuid()를 랜더링 될때 마다 호출하는데 이것을 바꿔보기  (해결)
  새로 고침을 누를 경우 초기화 되는문제 
  : useRef 사용해보기 
### 추가 기능
  query 추가시 위에 TAP으로 활성화 시키기 ..
  detailed option 이름 additional로 변경 
  각 Query 별로 Group(tag 기준), Merged(mean, sum) 선택 기능 넣기 (detailed옵션에), Graph 선택 (line, area 속성 넣기)
  RUN QUERY 버튼 왼쪽에 AGGRERGATION 옵션 넣고 (5s, 10s, 20s, 30s) Merged 옵션에 (mean, sum, max, min, frist, last) select 넣고 
  RUN 버튼 누르면 AGGREGATION 선택 시간 만큼 INTERVAL로 호출되도록 넣고 
