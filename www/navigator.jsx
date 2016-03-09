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
              <OnsButton onClick={navigator.pushPage.bind(navigator, {title: 'Another page', content: 'This is another page!', backButton: true})}>Push another page</OnsButton>
            </p>
            { route.backButton ? <p>
              <OnsButton onClick={navigator.popPage.bind(navigator)}>
                Go back
              </OnsButton>
            </p> : null}
          </OnsPage>
        }
      />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
