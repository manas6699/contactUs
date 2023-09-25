import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Linking } from 'react-native';
import {ToastAndroid} from 'react-native';
import qs from 'qs';

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");

    async function sendEmail(to, subject, body, options = {}) {
        const { cc, bcc } = options;

        let url = `mailto:${to}`;

        // Create email link query
        const query = qs.stringify({
            subject: subject,
            body: body,
            cc: cc,
            bcc: bcc
        });

        if (query.length) {
            url += `?${query}`;
        }

        // check if we can use this link
        const canOpen = await Linking.canOpenURL(url);

        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }

        return Linking.openURL(url);
    }

    function SubmitButton() {
        sendEmail(
            'info@redpositive.in',
            'Contact Form Message',
            'A message has been received from your React Native App.\n Name: ' + name + '\n Email: ' + email + '\n Mobile: ' + mobile + '\n Message: ' + message,
            { cc: 'manasbaroi6699@gmail.com' }
        ).then(() => {
            console.log('Your message was successfully sent!');
            ToastAndroid.show('Your message was successfully sent!', ToastAndroid.SHORT);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Contact Us</Text>
            <Text style={{ marginVertical: 20, textAlign: 'center', fontFamily: 'Roboto-Light', fontSize: 20 }}>
                Contact us by filling up the form
            </Text>
            <ScrollView>

                <View>
                    <Text style={styles.TextInputHeading}>Name</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            textContentType='name'
                            style={styles.TextInput}
                            placeholder="Name"
                            placeholderTextColor="#003f5c"
                            onChangeText={(name) => setName(name)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.TextInputHeading}>Mobile Number</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            textContentType='telephoneNumber'
                            placeholder="Mobile Number"
                            placeholderTextColor="#003f5c"
                            onChangeText={(mobile) => setMobile(mobile)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.TextInputHeading}>Email</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            textContentType='emailAddress'
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.TextInputHeading}>Message</Text>
                    <View style={styles.inputAreaView}>
                        <TextInput
                            style={{ ...styles.TextInput, textAlignVertical: 'top' }}
                            placeholder="Message"
                            placeholderTextColor="#003f5c"
                            onChangeText={(message) => setMessage(message)}
                            multiline={true}
                            numberOfLines={10}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        activeOpacity={2.0}
                        onPress={SubmitButton}
                        style={styles.buttonStyle}
                    >
                        <Text style={{
                            paddingVertical: 7.0, fontFamily: 'Roboto-Bold', fontSize: 20
                        }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 30,
        marginVertical: 60
    },
    heading: {
        fontFamily: 'Roboto-Bold',
        fontSize: 42,
        textAlign: 'center'
    },
    nameInput: {
        height: 40,
        width: 250,
        // margin: 12,
        borderWidth: 1,
        // padding: 10,
        borderRadius: 5
    },
    inputView: {
        borderWidth: 1,
        backgroundColor: "rgba(0, 0 ,0 ,0)",
        borderRadius: 5,
        width: "100%",
        height: 50,
        marginBottom: 10,
    },
    inputAreaView: {
        borderWidth: 1,
        backgroundColor: "rgba(0, 0 ,0 ,0)",
        borderRadius: 5,
        width: "100%",
        height: 125,
        marginBottom: 10,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
    },
    TextInputHeading: {
        // marginLeft: 10,
        paddingVertical: 5,
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    buttonStyle: {
        // set background colour as blue
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        height: 45,
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
        // cursor pointer
        cursor: 'pointer'
    },
})