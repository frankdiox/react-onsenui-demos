var MyModal = React.createClass({
  pop: function() {
    this.props.navigator.popPage();
  },

  render: function() {
    return (
      <OnsPage>
        <p style={{textAlign: 'center'}}>
          <OnsButton onClick={this.pop}>Go back</OnsButton>
        </p>
      </OnsPage>
    );
  }
});

var MyPage = React.createClass({
  push: function() {
    this.props.navigator.pushPage(MyModal);
  },

  render: function() {
    return (
      <OnsPage>
        <OnsToolbar><div className="center">{this.props.title}</div></OnsToolbar>
        <p style={{textAlign: 'center'}}>
          <OnsButton onClick={this.push}>Push a page</OnsButton>
        </p>
      </OnsPage>
    );
  }
});

var MyTabbar = React.createClass({
  renderTabs: function() {
    return [
      {
        content: <MyPage title="Home" navigator={this.props.navigator} />,
        tab: <OnsTab label="Home" />
      },
      {
        content: <MyPage title="Comments" navigator={this.props.navigator} />,
        tab: <OnsTab label="Comments" />
      }
    ];
  },

  render: function() {
    return (
      <OnsPage>
        <OnsTabbar
          renderTabs={this.renderTabs}
        />
      </OnsPage>
    );
  }
});

var App = React.createClass({
  renderScene: function(route, navigator) {
    return React.createElement(route, {navigator: navigator});
  },

  render: function() {
    return (
      <OnsNavigator
        renderScene={this.renderScene}
        initialRoute={MyTabbar}
      />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
