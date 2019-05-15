import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Lake from './Lake.jsx'
import gameItems from './gameItems'
import img4 from "./assets/farmer.png";


let leftItems = ['fox', 'chicken', 'grain'];
let rightItems = [];
let farmerPosition = false;

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    farmerPosition = !farmerPosition;

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '10px',
    margin: '10px',
    background: 'none',

    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: '#567d46',
    opacity: isDraggingOver ? '0.8' : '1',
    padding: '10px',
    width: 250,
    marginTop: '10px',
    marginBottom: '25px'
});

const getFarmerStyle = farmerPosition => ({
    display:'inline-block',
    width:'640px',
    textAlign: farmerPosition ? 'right' : 'left',
    paddingLeft: '95px',
    paddingRight: '95px',
});

function canMove(source, destination, droppableSource, droppableDestination){
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    leftItems = [];
    rightItems = [];

    result.left.forEach(function(e){
        leftItems.push(e.id);
    });
    result.right.forEach(function(e){
        rightItems.push(e.id);
    });

    if(farmerPosition === false){
        if(leftItems.includes(removed.id)){
            return false;
        }
    }
    else{
        if(rightItems.includes(removed.id)){
            return false;
        }
    }

    switch(removed.id){
        case 'fox':
            if(leftItems.includes('fox')){
                if(rightItems.includes('chicken') && rightItems.includes('grain')){
                    alert('You can\'t leave the chicken alone with the grain!');
                    return false;
                }
            }
            else{
                if(leftItems.includes('chicken') && leftItems.includes('grain')){
                    alert('You can\'t leave the chicken alone with the grain!');
                    return false;
                }
            }
            break;
        case 'chicken':
            break;
        case 'grain':
            if(leftItems.includes('grain')){
                if(rightItems.includes('chicken') && rightItems.includes('fox')){
                    alert('You can\'t leave the fox alone with the chicken!');
                    return false;
                }
            }
            else{
                if(leftItems.includes('chicken') && leftItems.includes('fox')){
                    alert('You can\'t leave the fox alone with the chicken!');
                    return false;
                }
            }
            break;
        default:
            break;
    }

    return true;
}



class FarmerGame extends Component {
    state = gameItems;

    id2List = {
        left: 'items',
        right: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'right') {
                state = { selected: items };
            }

            this.setState(state);
        }
        else {

            const allowed = canMove(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            if (allowed) {
                const result = move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );

                this.setState({
                    items: result.left,
                    selected: result.right
                });
            } else {
                const items = Array.from(this.getList(source.droppableId));
                let state = {items};

                if (source.droppableId === 'right') {
                    state = {selected: items };
                }

                this.setState(state);
            }
        }
    };

    handleClick = result => {

        const items = {};
        items['left'] = Array.from(this.getList('left'));
        items['right'] = Array.from(this.getList('right'));

        //if farmer on right
        if(farmerPosition){
            //if chicken and fox would be left alone, don't allow to move
            if(rightItems.includes('fox') && rightItems.includes('chicken')){
                alert('You can\'t leave the fox alone with the chicken!');
                return;
            }
            //if grain and chicken would be left alone don't allow to move
            else if(rightItems.includes('grain') && rightItems.includes('chicken')){
                alert('You can\'t leave the chicken alone with the grain!');
                return;
            }
            else{
            }
        }
        else{
            //if chicken and fox would be left alone, don't allow to move
            if(leftItems.includes('fox') && leftItems.includes('chicken')){
                alert('You can\'t leave the fox alone with the chicken!');
                return;
            }
            //if grain and chicken would be left alone don't allow to move
            else if(leftItems.includes('grain') && leftItems.includes('chicken')){
                alert('You can\'t leave the chicken alone with the grain!');
                return;
            }
            else{
            }
        }
        farmerPosition = !farmerPosition;

        let state = {
            items: items.left,
            selected: items.right
        };

        console.log(state);

        this.setState(state);
    };

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <div style={{textAlign: 'center', width:'640px', display:'inline-block', marginTop: '5px'}}>
                    <h6 style={{borderBottom: '1px solid black', paddingBottom: '5px'}}><strong>How To Play:</strong> The farmer can take one item across the river at a time. If the fox is left alone with the
                        chicken, he eats it. If the chicken is left alone with the grain, he eats it. If you try to move an
                        item that isn't allowed to be moved, it will snap back to the correct side. Try to get the fox,
                        chicken, and grain to the right side of the river!</h6>
                        <h6 style={{textAlign: 'left'}}><strong>Move the farmer: </strong>using the button below.</h6>
                        <h6 style={{textAlign: 'left'}}><strong>Move the fox, chicken, or grain: </strong>by dragging and dropping them to the other side.</h6>
                    <button className="waves-effect waves-light btn"
                            style={{backgroundColor: '#2e889a', display:'inline-block', marginTop: '10px', marginBottom: '5px' }}
                            onClick={this.handleClick}>
                        Move The Farmer
                    </button>
                </div>
                <div id={'farmerDiv'} style={getFarmerStyle(farmerPosition)}>
                    <img alt={'farmer'} src={img4} style={{width: '60px', height: '90px'}}/>
                </div>
            <div style={{display:'inline-flex'}}>
            <DragDropContext onDragEnd={this.onDragEnd} >
                <Droppable droppableId="left" >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Lake/>

                <Droppable droppableId="right">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            </div>
                <h6>Farmer icon <a href="https://www.vecteezy.com">by Vecteezy.com</a></h6>
            </div>
        );
    }
}

export default FarmerGame;
