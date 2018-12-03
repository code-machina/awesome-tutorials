import React from 'react';
import { Menu } from 'semantic-ui-react';
import styles from './RightCMenuN.css';
/*
 기존 함수형 컴포넌트들은 라이프사이클 API 를 사용하지 않고
 단지, props 만 전달해 주는 형태일 때 사용하며 그 외에는 클래스 형태로 정의하는 것이 좋다.

 props 를 전달하면서 Action Creator 기반으로 컴포넌트(Comnponent)가 리렌더링되는 것을
 생각할 수 있지만 사용자 클릭에 반응하여 스스로 동작하는 컴포넌트가 좀더 가벼워 보인다는 점이 있다.
 */

class RightCMenuN extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      parent: props.parent
    };
    // console.log(props)
  }
  componentDidMount() {
    document.addEventListener('contextmenu', this._handleContextMenu);
    document.addEventListener('click', this._handleClick);
    document.addEventListener('scroll', this._handleScroll);
  };

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);
    document.removeEventListener('click', this._handleClick);
    document.removeEventListener('scroll', this._handleScroll);
  }

  _handleContextMenu = (event) => {
      event.preventDefault();

      this.setState({ visible: true });

      const clickX = event.clientX;
      const clickY = event.clientY;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const rootW = this.root.offsetWidth;
      const rootH = this.root.offsetHeight;

      const right = (screenW - clickX) > rootW;
      const left = !right;
      const top = (screenH - clickY) > rootH;
      const bottom = !top;

      if (right) {
          this.root.style.left = `${clickX + 5}px`;
      }

      if (left) {
          this.root.style.left = `${clickX - rootW - 5}px`;
      }

      if (top) {
          this.root.style.top = `${clickY + 5}px`;
      }

      if (bottom) {
          this.root.style.top = `${clickY - rootH - 5}px`;
      }
  };

  _handleClick = (event) => {
      const { visible } = this.state;
      const wasOutside = !(event.target.contains === this.root);

      if (wasOutside && visible) this.setState({ visible: false, });
  };

  _handleScroll = () => {
      const { visible } = this.state;

      if (visible) this.setState({ visible: false, });
  };

  render() {
    const { visible, parent } = this.state;
    console.log(this.root);
    // console.log("rightcmenun.js  " + parent)
    return (visible || null) &&
        <div ref={ref => {this.root = ref}} className={styles.contextMenu}>
            <div className={styles.contextMenu__option}>Share this</div>
            <div className={styles.contextMenu__option__disabled}>New window</div>
            <div className={styles.contextMenu__option}>Visit official site</div>
            <div className={styles.contextMenu__option}>View full version</div>
            <div className={styles.contextMenu__option}>Settings</div>
            <div className={styles.contextMenu__separator} />
            <div className={styles.contextMenu__option}>About this app</div>
        </div>
  };
}

export default RightCMenuN;
