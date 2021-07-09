import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../../Styles/styles.css';
import '../navigation.css';

/**
 * Functional Presentational Component that displays a single Icon Item on the Navigation Bar.
 */
const NavIconItem = (props) => {
  const altname = props.altname;
  const dest = props.dest;
  const image = props.image;
  return (
    <>
      <Link to={dest}>
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={
            <Tooltip className="navicon-tooltip" id={`tooltip-bottom`}>
              {altname}
            </Tooltip>
          }
        >
          <img className="navicon" src={image} alt={altname} />
        </OverlayTrigger>
      </Link>
    </>
  );
};

export default NavIconItem;