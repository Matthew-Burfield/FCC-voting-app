import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList'

import PieChart from './PieChart'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100vw',
    height: '80vh',
    overflowY: 'auto',
  },
};

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const SurveyList = ({ surveys }) => (
  <div style={styles.root}>
    <PieChart />
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      {/* <Subheader>December</Subheader> */}
      {surveys.map(survey => (
        <a key={ survey._id } href='#'>
          <GridTile
            title={ survey.title }
            subtitle={<span>{ survey.comments.length } comments</span>}
          >
            <PieChart data={ survey.pollOptions } />
          </GridTile>
        </a>
      ))}
    </GridList>
  </div>
);

export default SurveyList;