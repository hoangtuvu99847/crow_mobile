import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { BUTTON_ICON, COLORS, TEXT } from '../../utils/colors';
import { ActivityIndicator } from 'react-native';
import { requestLogin } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { actionLogin } from '../redux/action';


export default function Login({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const dispatch = useDispatch()

    const validatePassword = () => password.length < 0 && 'Please input password'
    const validateUsername = () => username.length < 0 && 'Please input username'

    const forgotPassword = () => {

    }

    const storeUser = async (user) => {
        try {
            const jsonValue = JSON.stringify(user)
            return await AsyncStorage.setItem('@user', jsonValue)
        } catch (error) {
            console.log('ERROR: storeUser :: -> ', error)
        }
    }
    const login = async () => {
        setIsLogin(true)
        const data = {
            username: username,
            password: password
        }
        try {
            const response = await requestLogin(data)
            if (response.status === 200) {
                storeUser(response.data)
                dispatch(actionLogin())
            }
        } catch (error) {
            console.log('ERROR: login:: -> ', error);
        } finally {
            setIsLogin(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={styles.loginTitleContainer}>
                    <Text style={styles.loginTitle}>Login</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View>
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        style={styles.inputStyle}
                        placeholder='User ID'
                        onChangeText={(username) => setUsername(username)}
                        leftIcon={
                            <Icon
                                name='person-circle-outline'
                                size={22}
                                color='gray'
                            />
                        }
                    />
                    <Input
                        inputContainerStyle={styles.inputContainer}
                        style={styles.inputStyle}
                        placeholder='Password'
                        onChangeText={(password) => setPassword(password)}
                        leftIcon={
                            <Icon
                                name='lock-closed-outline'
                                size={22}
                                color='gray'
                            />
                        }
                        secureTextEntry={true}
                        errorStyle={{ color: 'red' }}
                    />
                </View>

            </View>
            <View>
                <View style={styles.buttonContent}>
                    <TouchableOpacity style={styles.button} onPress={login}>
                        <View style={{ flexDirection: "row" }}>
                            {
                                isLogin ? <ActivityIndicator size="small"
                                    color={TEXT.WHITE}
                                    style={{ marginRight: 6 }}></ActivityIndicator> :
                                    <Text style={styles.buttonTitle}>Login </Text>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.forgotPswContent}>
                    <TouchableOpacity onPress={forgotPassword}>
                        <Text style={{ color: BUTTON_ICON.ACTIVE, fontSize: 12 }}>Forgot password ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.footerContent}>
                    <TouchableOpacity>
                        <Text style={styles.textFooter}>Don't have an account ? <Text style={styles.register}>Register</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    register: {
        fontSize: 13,
        color: BUTTON_ICON.ACTIVE
    },
    textFooter: {
        fontSize: 12,
        color: "gray"
    },
    button: {
        backgroundColor: BUTTON_ICON.ACTIVE,
        paddingVertical: 10,
        maxWidth: "40%",
        alignItems: "center"
    },
    buttonTitle: {
        color: TEXT.WHITE
    },
    buttonContent: {
        marginHorizontal: 10
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#616161"
    },
    loginTitleContainer: {
        marginHorizontal: 10,
        marginBottom: 30
    },
    inputContainer: {
        flex: 4
    },
    forgotPswContent: {
        marginHorizontal: 10,
        marginTop: 10
    },
    title: {
        flex: 3,
        flexDirection: "column-reverse"

    },
    inputContainer: {
        maxHeight: '50%',
        maxWidth: '90%',
        // borderBottomWidth: 0.5
    },
    inputStyle: {
        fontSize: 16,
        // fontFamily: ""
    },
    footerContainer: {
        flex: 3,
        flexDirection: "column-reverse"
    },
    footerContent: {
        marginHorizontal: 10,
        alignSelf: "center",
        marginBottom: 15
    },
    errorContainer: {
        marginVertical: 6,
        marginLeft: 10
    }
})