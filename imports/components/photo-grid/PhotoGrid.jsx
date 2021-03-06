import React, { Component } from 'react';
import { createContainer } from '.meteor/react-.meteor-data';
import { Listenings } from '../../api/listenings.js';
import TrackerReact from '.meteor/ultimatejs:tracker-react';
//Components
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';
// import Paginate from '../paginate/Paginate.jsx';
import FilterLabels from '../filter-labels/FilterLabels.jsx';

import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';

class PhotoGrid extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      limit: 9
    }
    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    Session.set('pageLimit', 9);
  }

  componentWillUnmount() {
    Session.set('pageLimit', 9);
  }


  loadMore() {
    let limit = this.state.limit + 9;
    this.setState({ limit: limit });
    Session.set('pageLimit', limit);
  }

  render() {
    let loading = this.props.loading;
    let listenings = this.props.listenings;
    if (loading) {

      /*
      if(Session.get('filterData')) {
        let filterData = Session.get('filterData');
        // listenings = Listenings.find({
        //   "listeningInfo.city" : filterData.city.replace(/\s/g, ''),
        //   "listeningInfo.typeDeal" : filterData.typeDeal.replace(/\s/g, ''),
        //   "listeningInfo.typeProperty" : filterData.typeProperty.replace(/\s/g, ''),
        //   "listeningInfo.paymentPeriod" : filterData.paymentPeriod.replace(/\s/g, '')
        // }).fetch();
        listenings = Listenings.find({}).fetch();
      }*/

      if(listenings.length) {
        return (
          <div>
            <FilterLabels />
            <div className="photo-grid">
              {listenings.map((listening, index) => {
                return (
                  <div key={"photo-grid-" + index} className="photo-grid__item">
                    <ListeningPreview
                      key={index}
                      listeningData={listening}
                      layout="index"
                    />
                  </div>
                );
              })}
            </div>
            <div className="paginate-wrapper">
              <div className="paginate">
                <Button primary onClick={this.loadMore}>Загрузить еще</Button>
              </div>
            </div>
          </div>
        );
      } else {
        return(
          <div>
            <Message
              header='Объявлений не найдено'
              content='Попробуйте смягчить критерии поиска'/>
          </div>
        );
      }
    } else {
      return(
        <div>
          <Dimmer inverted active>
            <Loader indeterminate>Загрузка...</Loader>
          </Dimmer>
        </div>
      );
    }
  }
}

PhotoGrid.propTypes = {};

export default createContainer(({ params }) => {
  const listeningsSubscription = Meteor.subscribe('listenings.public', {}, {limit: Session.get('pageLimit')});
  const loading = listeningsSubscription.ready();
  const listenings = Listenings.find({}, {sort:{"listeningTech.createdAt": -1}}).fetch();
  return {loading, listenings}
}, PhotoGrid);