import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import SwipeableViews from 'react-swipeable-views';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default class FullWidthTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.selected ? props.selected : 0 };
  };

  handleChange(event, value) {
    this.setState({value: value });
  };

  handleChangeIndex(index) {
    this.setState({ value: index });
  };

  render() {
    return (
      <div className="custom-main">
        <AppBar className="tabs-bar" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            {this.props.labels.map((label, index) =>
              <Tab key={'tab' + index} label={label} />
            )}
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex.bind(this)}
        >
          {this.props.tabs.map((oneTab, index) =>
            <TabContainer key={'tab' + index}> {index === this.state.value ? oneTab : <div> </div>} </TabContainer>
          )}
        </SwipeableViews>
      </div>
    );
  }
}