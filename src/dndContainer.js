import React from "react";
import { List, ListItem } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  draggableLeftItem: {
    backgroundColor: "#3f51b5",
    border: "1px solid rgb(22, 22, 22)"
  },
  draggableRightItem: {
    backgroundColor: "#b71c1c",
    border: "1px solid rgb(22, 22, 22)"
  },
  draggableContainer: {
    position: "relative",
    width: 500,
    height: 300,
    border: "3px solid rgb(22, 22, 22)",
    maxWidth: "100%"
  },
  droppableContainer: {
    position: "relative",
    width: 500,
    height: 300,
    marginTop: "8%",
    border: "3px solid rgb(22, 22, 22)"
  }
});

export default function DndContainer(props) {
  const classes = useStyles();

  const onDragStart = (event, itemName) => {
    console.log("dragstart on div: ", itemName);
    event.dataTransfer.setData("itemName", itemName);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, newType) => {
    let itemName = event.dataTransfer.getData("itemName");
    console.log("dropped: ", itemName);

    let updatedList = props.list.filter(item => {
      if (item.itemName === itemName) {
        item.type = newType;
      }
      return item;
    });

    props.updateList(updatedList);
  };

  var itemList = {
    left: [],
    right: []
  };

  const listProps = props.list;

  const renderList = () => {
    listProps.forEach((item, index) => {
      itemList[item.type].push(
        <div
          key={index}
          onDragStart={event => onDragStart(event, item.itemName)}
          draggable
          className={
            props.toDrag
              ? classes.draggableLeftItem
              : classes.draggableRightItem
          }
        >
          {item.itemName}
          <br />
          {item.type}
        </div>
      );
    });
  };

  return (
    <div>
      {renderList()}
      {props.toDrag === true ? (
        <div
          className={classes.draggableContainer}
          onDragOver={event => onDragOver(event)}
          onDrop={event => {
            onDrop(event, "left");
          }}
        >
          {
            <List>
              {itemList.left.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          }
        </div>
      ) : (
        <div
          className={classes.droppableContainer}
          onDragOver={event => onDragOver(event)}
          onDrop={event => onDrop(event, "right")}
        >
          {
            <List>
              {itemList.right.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          }
        </div>
      )}
    </div>
  );
}
