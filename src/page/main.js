import React, { Component } from "react";
// import { Switch, Route, Redirect, Link } from "react-router-dom";
import { hot } from "react-hot-loader";
import View1 from "CMT/view1.jsx";
import View2 from "CMT/view2.jsx";
import "STYLE/style.scss";
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: "Hello World!"
    };
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            {/* <Menu.Item key="1"><Link to="/view1/">View1</Link></Menu.Item> */}
            {/* <Menu.Item key="2"><Link to="/view2/">View2</Link></Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <h2>{this.state.title}</h2>
            {/* <Switch>
              <Route exact path="/" component={View1} />
              <Route path="/view1/" component={View1} />
              <Route path="/view2/" component={View2} />
              <Redirect to="/" />
            </Switch> */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}

export default hot(module)(Main);