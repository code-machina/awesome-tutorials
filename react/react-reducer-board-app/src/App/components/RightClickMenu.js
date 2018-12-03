import React from 'react';
import { Menu } from 'semantic-ui-react';

// 구현을 좀더 심화할 수록 점점 더 React.Component 의 사용에 대한 동기가 생성되고 있음
const RightCMenu = () => {
  let activeItem = '';
  let actve = false;
  // 함수 내에 함수를 정의가 어려운 것으로 보임
  const handleItemClick = name => {console.log('Menu Item Click\'s been caught');activeItem = name; actve = !actve;};
  return (
    <Menu vertical borderless={actve}>
      <Menu.Item>
        <Menu.Menu >
          <Menu.Item name="Remove"
            active={activeItem === "Remove"}
            onClick={handleItemClick}></Menu.Item>
          <Menu.Item name="Edit"
            active={activeItem === "Edit"}
            onClick={handleItemClick}></Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default RightCMenu;
