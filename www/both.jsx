var MyNavigator = React.createClass({
  render: function() {
    return (
      <OnsNavigator
        initialRoute={'first'}
        renderScene={(route, navigator) => {
          if (route === 'first') {
            return (
              <OnsPage>
                <p>Hello!</p>
                <ons-button onClick={navigator.pushPage.bind(navigator, 'second')}>Push</ons-button>
              </OnsPage>
            );
          }
          else {
            return (
              <OnsPage>
                <p>World!</p>
                <ons-button onClick={navigator.popPage.bind(navigator)}>Pop</ons-button>
              </OnsPage>
            );
          }
        }}
      />
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <OnsTabbar
        initialIndex={1}
        renderTabs={(activeIndex, tabbar) => [
            {
              content: <OnsPage><p>Home</p></OnsPage>,
              tab: <OnsTab label="Home" />
            },
            {
              content: <OnsPage><MyNavigator /></OnsPage>,
              tab: <OnsTab label="Navigator"></OnsTab>
            }
          ]
        } />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
