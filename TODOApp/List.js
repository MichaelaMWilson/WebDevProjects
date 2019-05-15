import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import {CheckBox} from 'react-native-elements';
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from 'react-native-action-button';
import Dialog from 'react-native-dialog';
import DialogButton from "react-native-dialog/src/Button";

export default class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            input: "",
            empty: true,
            currentKey: 1,
            todos: [],
            checked: []
        };
    }

    saveList = newList => {
        const saveList = AsyncStorage.setItem('todos', JSON.stringify(newList));
    };

    saveCurrentKey = newKey => {
        const saveCurrentKey = AsyncStorage.setItem('currentKey', JSON.stringify(newKey));
    };

    saveCheck = newCheck =>{
        const saveCheck = AsyncStorage.setItem('completed', JSON.stringify(newCheck));
    };

    saveEmpty = newEmpty =>{
        const saveEmpty = AsyncStorage.setItem('empty', JSON.stringify(newEmpty));
    };

    loadList = async () => {
        try{
            const getList = await AsyncStorage.getItem('todos');
            const parseList = JSON.parse(getList);
            const getKey = await AsyncStorage.getItem('currentKey');
            const parseKey = JSON.parse(getKey);
            const getChecked = await AsyncStorage.getItem('completed');
            const parseChecked = JSON.parse(getChecked);
            const getEmpty = await AsyncStorage.getItem('empty');
            const parseEmpty = JSON.parse(getEmpty);

            this.setState({todos: parseList || [], currentKey: parseKey || 1, checked: parseChecked || [], empty: parseEmpty || false});
        }
        catch(error){
            console.log(error);
        }
    };

    isChecked(key){
        return this.state.checked.indexOf(key) > -1
    }

    handleCheck(key, e){
        if(!this.isChecked(key)) {
            this.setState(prevState => {
                const newState = {
                    checked: [...prevState.checked, key]
                };
                this.saveCheck(newState.checked);
                return {...newState};
            })
        }
        else{
            this.setState(prevState => {
                const newState = {
                    checked: prevState.checked.filter(id => id !== key)
                };
                this.saveCheck(newState.checked);
                return {...newState};
            })
        }
    };

    showDialog = () => {
        this.setState({dialogVisible: true});
    };

    handleCancel = () => {
        this.setState({dialogVisible: false});
    };

    handleAdd = (input) => {
        if (input.trim().length > 0){
            this.setState(
                prevState => {
                    let todos = prevState.todos;
                    const newState = {
                        dialogVisible: false,
                        todos: [...todos, {key: this.state.currentKey, text: input}],
                        input: "",
                        empty: false,
                        currentKey: this.state.currentKey + 1
                    };

                    this.saveList(newState.todos);
                    this.saveCurrentKey(newState.currentKey);
                    this.saveEmpty(false);

                    return {...newState};
                },
            );
        }
        else{
            this.setState({dialogVisible: false});
        }
    };

    handleDelete = (key) => {
        this.setState(
            prevState => {
                let todos = prevState.todos;
                let empty = false;
                if (todos.length === 1){
                    empty = true;
                }
                const newState = {
                    todos: todos.filter(todo =>
                        todo.key !== key),
                    checked: prevState.checked.filter(id => id !== key),
                    empty: empty
                };

                this.saveList(newState.todos);
                this.saveCheck(newState.checked);
                this.saveEmpty(empty);

                return {...newState};
            }
        )
    };

    componentDidMount(){
        this.loadList();
    }

    render(){
        const todoList = this.state.todos.map(itemInfo => {
            return(
                <View key={itemInfo.key} style={styles.todoItem}>
                    <CheckBox size={30} iconType="ionicon" uncheckedIcon="md-radio-button-off"
                              checkedIcon="md-checkmark-circle" checkedColor='#a8d08d' uncheckedColor='#a8d08d'
                              containerStyle={styles.todoCheck}
                              wrapperStyle={styles.todoCheck}
                              checked={this.state.checked.includes(itemInfo.key)} onPress={(e) => this.handleCheck(itemInfo.key, e)} />
                    <Text style={styles.todoText}>{itemInfo.text}</Text>
                    <TouchableOpacity onPress={() => this.handleDelete(itemInfo.key)}><Icon name="md-trash" size={25}/></TouchableOpacity>
                </View>
            )
        });

        let emptyStyle;

        if(!this.state.empty){
            emptyStyle = {
                display: "none",
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                fontSize:22
            }
        }
        else{
            emptyStyle = {
                display: "flex",
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                fontSize:22
            }
        }

        return(
            <View style={styles.container}>
                <Dialog.Container visible={this.state.dialogVisible} >
                    <Dialog.Input label="Add a new todo item" onChangeText={(input) => this.setState({input: input})} wrapperStyle={{borderBottomColor: '#a8d08d', borderBottomWidth: 1}}/>
                    <DialogButton label="Cancel"  color='#a8d08d' onPress={this.handleCancel} />
                    <DialogButton label="Add" color='#a8d08d' onPress={() => this.handleAdd(this.state.input)} />
                </Dialog.Container>

                <ScrollView style={styles.todoContainer}>
                    {todoList}
                </ScrollView>

                <Text style={emptyStyle}>Nothing left to do!</Text>

                <ActionButton buttonColor='#a8d08d' size={50} offsetX={20} offsetY={20} >
                    <ActionButton.Item size={50} buttonColor='#2A2D34' title='New Todo' onPress={this.showDialog}>
                        <Icon name='md-create' style={{color: 'white'}}/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginTop: 30
    },
    addContainer:{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    input:{
        borderColor: 'gray',
        borderWidth: 1,
        color: 'gray',
        borderRadius: 5,
        padding: 2,
        paddingLeft: 5,
        paddingRight: 5,
        overflow: 'scroll',
        width: '80%',
        marginLeft: 10
    },
    btn:{
        backgroundColor: '#a8d08d',
        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 0
    },
    todoContainer:{
        width: '100%',
        marginTop: 10,
    },
    todoItem:{
        margin: 10,
        borderBottomColor: '#a8d08d',
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        width: "95%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'scroll',
    },
    todoText:{
        width: '75%',
        fontSize: 16,
        lineHeight: 30,
        marginRight: 5,
    },
    todoCheck:{
        width: '10%',
        padding: 0,
        margin: 0
    },
});
