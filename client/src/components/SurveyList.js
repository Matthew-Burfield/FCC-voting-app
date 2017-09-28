import { Link } from 'react-router-dom'
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
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      {surveys.map(survey => (
        <Link
          key={ survey._id }
          to={ `/poll/${survey._id}` }
        >
          <GridTile
            className='griditem'
            title={ survey.title }
            subtitle={<p>{ survey.comments.length } comments</p>}
          >
            <PieChart
              data={ survey.pollOptions }
              width={200}
              height={200}
            />
          </GridTile>
        </Link>
      ))}
    </GridList>
  </div>
);

export default SurveyList;