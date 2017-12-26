import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';
import MenuIcon from 'material-ui-icons/Menu';
import { MenuItem } from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import Select from 'material-ui/Select'
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';


const styles = {
  row: {
    flex: 1,
    display: 'flex',
    // borderBottom: 'thin solid grey'
  },
  column: {
    flex:1,
    // borderRight: 'thin solid grey'
  },
  spanLabel:{
    fontWeight: 600,
    verticalAlign: 6
  },
  columnActive:{
    // border: 'blue thin solid'
  },
  textarea:{
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    lineHeight: '1.6em',
    fontSize: '13pt',
    resize: 'none',
    overflow: 'hidden',
    outline: 'none'
  },
  root: {
    width: '100%',
  },
  content: {
    padding: 40
  },
  flex: {
    flex: 1,
  },
  flexDisplay: {
    display: 'flex',
    flexDirection: 'column'
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
  tile: {
    // background: 'red'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  toolbar: {
    minHeight: 38
  },
  button: {
    minHeight: 26,
    height: 26
  },
  menuButton: {
    height: 38,
    color: '#000',
    marginLeft: -12,
    marginRight: 20,
  }
};

const tileData = [
  {
    img: 'https://www.textures.com/system/categories/35905/frontend-large.jpg',
    title: "Brick",
    cols: 2,
    author: 'Vishal'
  },
  {
    img: 'https://4.imimg.com/data4/IW/BU/GLADMIN-184572/nitco-tiles-250x250.jpg',
    title: 'red',
    author: 'Unknown'
  }
];

const Row = (props) => (<div className={props.classes.row}>{props.columns}</div>)

const Column = (props) => (
  <div className={props.classes.column}>
  <textarea
    className={props.active ? (props.classes.columnActive+' '+props.classes.textarea) :props.classes.textarea}
    onFocus={props.handleFocus.bind(null,{row:props.row,column:props.column})}
    onChange={props.handleChange}
    value={props.text}
  />
  </div>)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      anchor : 'left',
      rows : 1,
      columns : 1,
      data: [
        [{
          text: ''
        }]
      ],
      active:{
        row:1,
        column:1
      }
    }
    this.addRow = this.addRow.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.removeColumn = this.removeColumn.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.saveData = this.saveData.bind(this);
  }
  componentWillMount(){
    let data = localStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);
      this.setState({data});
    }
  }
  addRow() {
    let data = this.state.data;
    let pushData = data
    data.push([{text:''}]);
    this.setState({data},this.saveData)
  }
  addColumn() {
    let data = this.state.data;
    data[this.state.active.row-1].push({text:''});
    this.setState({data},this.saveData)
  }
  removeRow() {
    let data = this.state.data;
    data = data.filter(
      (dat,i) =>  i != (data.length - 1)
    )
    if (data.length) {
      this.setState({data},this.saveData)
    }
  }
  removeColumn() {
    let data = this.state.data;
    let activeRowIndex = this.state.active.row-1;
    let activeColumnIndex = this.state.active.column-1;
    let temp = data[activeRowIndex].filter((col,i) => i != data[activeRowIndex].length - 1 );
    if (temp && temp.length ) {
      data[activeRowIndex] = temp;
      this.setState({data},this.saveData);
    }
  }
  handleFocus(active) {
    console.log(active,'=',this.state.data);
    this.setState({active})
  }
  handleChange(cell,e) {
    console.log(cell,e.target.value);
    let data = this.state.data;
    if (this.state.active.row && data[this.state.active.row-1] && data[this.state.active.row-1][this.state.active.column-1]) {
      data[this.state.active.row-1][this.state.active.column-1]['text'] = e.target.value;
      this.setState({data},this.saveData);
    }
  }
  handleOpen () {
    this.setState({open: !this.state.open})
  }
  saveData(data){
    if (!data) {
      data = this.state.data;
    }
    localStorage.setItem("data", JSON.stringify(data));
  }
  render() {
    let that = this;
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;
    // for (var i = 0; i < this.state.rows; i++) {
    //   columns = [];
    //   for (var j = 0; j < this.state.columns; j++) {
    //     columns.push(
    //       <Column
    //         key={j}
    //         column={j+1}
    //         row={i+1}
    //         classes={this.props.classes}
    //         handleFocus={this.handleFocus}
    //         handleChange={this.handleChange.bind(that,{row:i+1, column:j+1})}
    //       />);
    //   }
    //   rows.push(
    //     <Row
    //       key={i}
    //       serial={i+1}
    //       classes={this.props.classes}
    //       columns={columns}
    //     />
    //   );
    // }
    let rows = this.state.data.map((row,i) => {
      let columns = row.map((column,j) => (
        <Column
          key={j}
          column={j+1}
          row={i+1}
          classes={that.props.classes}
          handleFocus={that.handleFocus}
          handleChange={that.handleChange.bind(that,{row:i+1, column:j+1})}
          text={column.text}
          active = {that.state.active.row == i+1 && that.state.active.column == j+1}
        />
      ));
      return (
        <Row
          key={i}
          serial={i+1}
          classes={this.props.classes}
          columns={columns}
        />
      )
    })
    return (
      <div className={"fullWidth "+classes.flexDisplay+" "+classes.overflowHidden}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.handleOpen}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Notes
          </Typography>
          {/*<Button color="primary" raised component={Link} to="/" className={classes.button}>
          Home
          </Button>*/}
        </Toolbar>
      </AppBar>
      <Drawer
        type="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleOpen}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <div className={classes.flex1}>
              <IconButton className={this.props.classes.iconbutton} aria-label="Delete" onClick={this.addRow}>
                <AddIcon />
              </IconButton>
              <span className={this.props.classes.spanLabel}>Row</span>
              <IconButton className={this.props.classes.iconbutton} aria-label="Delete" onClick={this.removeRow} disabled={this.state.data.length==1}>
                <RemoveIcon />
              </IconButton>
            </div>
          </List>
          <Divider />
          <List className={classes.list}>
            <div className={classes.flex1}>
              <IconButton className={this.props.classes.iconbutton} aria-label="Delete" onClick={this.addColumn}>
                <AddIcon />
              </IconButton>
              <span className={this.props.classes.spanLabel}>Column</span>
              <IconButton className={this.props.classes.iconbutton} aria-label="Delete" onClick={this.removeColumn} >
                <RemoveIcon />
              </IconButton>
            </div>
          </List>
          <Divider />
      
        </div>
      </Drawer>
      <div className="App">
        {rows}
      </div>

      </div>
    );
  }
}

const BasicExample = (props) => (
  <Router>
    <div className="fullWidth">
      <Route exact path="/" component={withStyles(styles, { withTheme: true })(App)}/>
      <Route exact path="/about" component={withStyles(styles)(About)}/>
    </div>
  </Router>
);

const About = (props) => (
  <div className={props.classes.root}>
    <div className={props.classes.content}>
      <GridList cellHeight={160} className={props.classes.gridList} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1} className={props.classes.tile}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={props.classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  </div>
)

export default withStyles(styles)(BasicExample);
