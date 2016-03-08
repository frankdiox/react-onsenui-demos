var App = React.createClass({
  render: function() {
    return (
      <OnsNavigator
        initialRoute={{title: 'First page', content: 'This is the first page!', backButton: false}}
        renderScene={(route, navigator) =>
          <OnsPage>
            <OnsToolbar>
              <div className="center">{route.title}</div>
            </OnsToolbar>

            <p>{route.content}</p>

            <p>
              <ons-button onClick={navigator.pushPage.bind(navigator, {title: 'Another page', content: 'This is another page!', backButton: true})}>Push another page</ons-button>
            </p>
            { route.backButton ? <p>
              <ons-button onClick={navigator.popPage.bind(navigator)}>
                Go back
              </ons-button>
            </p> : null}
          </OnsPage>
        }
      />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
