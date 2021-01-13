# KeepIt 웹페이지 연결 & 토큰 저장 크롬익스텐션 개발 프로젝트


-> [자세한 데모영상 링크](https://cau-meng2.tistory.com/63?category=774824)



<img src = "https://user-images.githubusercontent.com/42762236/104194924-4b7f5c00-5465-11eb-8523-8dea76e493fc.png" width="300px">

## **KeepIt Chrome Extension 개요**


 KeepIt은 자신이 저장하고 싶은 웹사이트 링크들을 나만의 공간에 분류 및 저장할 수 있게 해주며, Instagram, facebook, Pinterest처럼 뉴스피드 형식으로 모아보기, 팔로우, 팔로워 기능이 있는 북마크 저장 웹사이트이다.



경영자 , 개발자, UX 디자이너 등으로 총 5명이 개발하는 중이며, 그 중에서 나는 크롬익스텐션 개발을 담당 하였다.



개발한 크롬익스텐션을 설명하기위해 KeepIt 웹사이트의 기능에 대하여 짧게 설명하겠다.

[**KEEP IT**](https://www.keepit.site/)

## **KeepIt 사진 설명**

![image](https://user-images.githubusercontent.com/42762236/104195309-ca749480-5465-11eb-8c96-47733d372518.png)

- KeepIt에서 로그인뒤 보이는 화면으로 사용자들이 저장한 링크, 코멘트 들을 뉴스피드처럼 한 곳에 모아 보여준다.

![image](https://user-images.githubusercontent.com/42762236/104195343-d8c2b080-5465-11eb-97ec-51c0bd2b296c.png)

- 내 프로필을 누르면 나의 컬렉션정보들과 팔로잉, 팔로워 정보가 뜬다.
위의 컬렉션 정보들을 KeepIt 크롬익스텐션으로 가져와 현재 저장할 링크를 크롬익스텐션으로 원하는 폴더에 메모를 남겨 저장 할 수 있도록 하였다. 


## **KeepIt 크롬 익스텐션 기능 설명**

-   처음에 Authorization 토큰이 LocalStorage에 저장되어 있지 않다면, 로그인 Html을 띄운다.
-   reset password 또는 create an account를 누르면 Keepit 웹사이트의 회원가입 또는 비번초기화 화면을 띄운다.

![image](https://user-images.githubusercontent.com/42762236/104195717-54bcf880-5466-11eb-86bc-1227844ba538.png)



-   로그인을 하기 위해 Keepit 웹사이트에 사용하는 아이디와 비번을 입력하고 **Sign in** 버튼을 누른다.
-   KeepIt의 회원이라면 로그인이 성공하며, 다음화면으로 넘어간다.

![image](https://user-images.githubusercontent.com/42762236/104195927-9483e000-5466-11eb-8c60-7a9f3b2ea340.png)
![image](https://user-images.githubusercontent.com/42762236/104195959-9e0d4800-5466-11eb-950b-efe815438363.png)



-   한번 로그인을 하였으면 , 현재 create keep 창은 창을 닫아도 다시 로그인하라는 창이 뜨지 않으며, create keep 창이 바로 뜬다.
-   자동으로 현재 가장 최근의 사용한 웹의 Url 이 입력되어있으며, collection 선택 박스에는 로그인한 Keepit 사용자 계정에 만들어져있는 컬렉션들의 값들을 보여준다.
-   링크를 나의 컬렉션에 저장하기 위하여 url과 collection은 필수로 선택하여야하며, keeper's title, keeper's note, tags는 선택사항이다.
-   tags에는 콤마(,)로 각 단어를 구분하며, 최대 3개까지 넣을수 있으며, 띄어쓰기는 혀용되지 않는다. 만약 tags에 허락되지 않은 값을 넣을 경우 밑에 빨간색 글씨가 뜬다.
-   **sign out** 버튼은 누르면 현재 로그인된 계정을 로그아웃하며, 다시 로그인창을 띄운다.

![image](https://user-images.githubusercontent.com/42762236/104195991-a82f4680-5466-11eb-919c-116d5421f7bb.png)

![image](https://user-images.githubusercontent.com/42762236/104196048-b2e9db80-5466-11eb-9008-9800e7baec5d.png)


-   **create**을 누르게되면 저장이 성공적으로 되었다면, Keep Created 되었다는 창이 뜬다.
-   **View in Keepit** 버튼을 누르면 저장된 collection 웹으로 이동한다. 

![image](https://user-images.githubusercontent.com/42762236/104196094-bc734380-5466-11eb-8928-f077fbc92793.png)


크롬 익스텐션은 개발자가 익스텐션을 배포하기 전에 원하는 사용자 그룹에게 테스터를 게시할 수 있게 한다. 테스터를 업데이트 함으로써 피드백을 받아 지속적인 development를 하였다.

## **사용한 기술**
![image](https://user-images.githubusercontent.com/42762236/104196142-ca28c900-5466-11eb-8cf9-4e18e43c64ee.png)
![image](https://user-images.githubusercontent.com/42762236/104196155-cc8b2300-5466-11eb-93b7-cb763a40af14.png)
![image](https://user-images.githubusercontent.com/42762236/104196165-ceed7d00-5466-11eb-8513-5680ac8f4aeb.png)
![image](https://user-images.githubusercontent.com/42762236/104196172-d14fd700-5466-11eb-9595-23956376894a.png)
![image](https://user-images.githubusercontent.com/42762236/104196184-d44ac780-5466-11eb-8653-3eadcf200ea9.png)
![image](https://user-images.githubusercontent.com/42762236/104196195-d745b800-5466-11eb-9585-67d9786b24df.png)
![image](https://user-images.githubusercontent.com/42762236/104196205-d9a81200-5466-11eb-92f2-02a35268a654.png)
![image](https://user-images.githubusercontent.com/42762236/104196215-dc0a6c00-5466-11eb-829b-9718158d0baa.png)

