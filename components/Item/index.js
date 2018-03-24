import React from 'react';
import {Fragment} from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';

const ItemOnline = () => (
  <span>Online</span>
)

const ItemHeader = ({title, description, tag, date}) => {
  let dateFormatted;
  if(date) {
    let newDate = new Date(date);
    dateFormatted = (newDate.getMonth() + 1) + '.' + newDate.getDate() + '.' +  newDate.getFullYear();
  }

  return(
    <div>
      <h3>{title}</h3>
      <div>{tag} {dateFormatted }
      </div>
      <p>{description}</p>
    </div>
  )
}

const ItemImage = ({object, alt}) => {
  let imgUrl;
  if (object) {
    if (Array.isArray(object.object)) {
      imgUrl = object.object[0].file['@url'];
    } else {
      imgUrl = object.object.file['@url'];
    }
  }

  return(
    <Fragment>
      <img src={imgUrl} alt={alt} />
      <style jsx>{`
        img {
          width:300px;
        }
      `}</style>
    </Fragment>
  )
}



class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: '/static/placeholder.png',
    }
    this.toggleOverlayOn = this.toggleOverlayOn.bind(this);
    this.toggleOverlayOff = this.toggleOverlayOff.bind(this);
  }

  toggleOverlayOn() {
    this.setState({open: true})
  }

  toggleOverlayOff() {
    this.setState({open: false})
  }

  render() {
    return (
      <div onMouseEnter={this.toggleOverlayOn} onMouseLeave={this.toggleOverlayOff}>
        {this.props.object &&
          <ItemOnline />
        }
        {this.props.object &&
          <ItemImage object={this.props.object} alt={this.props.title} />
        }
        <ItemHeader 
          title={this.props.title}
          description={this.props.description}
          tag={this.props.tag}
          date={this.props.date}
        />
        {/* This needs to be accessible in some way,
            maybe set state in css showing component if focused or mouseEnter,
            instead of mounting and unmounting component
        */}
        {this.state.open &&
          <a href={'https://catalog.archives.gov/id/' + this.props.naid} target='_blank'>View in Catalog</a>
        }
        
        <style jsx>{`
          img {
            width: 300px;
          }
          div {
            background: #f1f1f1;
            margin-bottom: 20px;
            padding: 20px;
          }
          div:nth-child(odd) {
            background: #dce4ef;
          }
        `}</style>
      </div>
    );
  }
}

Item.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  object: PropTypes.bool.isRequired,
  resultType: PropTypes.oneOf(['item']).isRequired,
  title: PropTypes.string.isRequired,
}

export default Item;
