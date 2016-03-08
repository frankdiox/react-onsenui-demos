var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
        <OnsToolbar>
          <div className="center">{this.props.title}</div>
        </OnsToolbar>

        <p>
          {this.props.content}
        </p>
      </OnsPage>
    );
  },
});

var App = React.createClass({
  render: function() {
    return (
      <OnsTabbar
        initialIndex={1}
        renderTabs={(activeIndex, tabbar) => [
            {
              content: <MyPage title="Home" content="Home content" />,
              tab: <OnsTab label="Home" />
            },
            {
              content: <MyPage title="Comments" content="Comments content" />,
              tab: <OnsTab label="Comments" />
            }
          ]
        } />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
