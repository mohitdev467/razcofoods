import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderWithBack from "../../Components/CommonComponents/HeaderWithBack";
import { ImagePicker } from "../../helpers/ImageHelper/ImagePicker";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";
import { helpSupportContent } from "../../constants/StaticContent/HelpSupportContent";
import EarnPointsCard from "../../Components/EarnPointsCard/EarnPointsCard";
import RazcoFoodDescription from "../../Components/HomeScreenComponents/RazcoFoodDescription";
import PhoneNumberInput from "../../Components/CommonComponents/PhoneNumberInput";
import CustomInputField from "../../Components/CommonComponents/CustomInputField";
import ButtonComponent from "../../Components/CommonComponents/ButtonComponent";
import { deleteAccountValidationSchema } from "../../helpers/Validations/ValidationSchema";
import {
    handleDeleteAccountRequest,

} from "../../services/UserServices/UserServices";
import successHandler from "../../helpers/Notifications/SuccessHandler";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../Components/CommonComponents/Loader";
import useAuthStorage from "../../helpers/Hooks/useAuthStorage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import screenNames from "../../helpers/ScreenNames/screenNames";

const DeleteAccountScreen = () => {
    const { clearLoginData } = useAuthStorage();
    const navigation = useNavigation()
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        reason: "",
        countryCode: 'US',
        number: "",
        visible: false,
        showThankYouMessage: false,
        loading: false,
    });


    const [formErrors, setFormErrors] = useState({});

    const updateFormState = (name, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (formErrors[name]) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const handleChangeText = (field, value) => {
        updateFormState(field, value);
    };

    const handlePhoneChange = (val) => {
        updateFormState("number", val);
    };


    const handleSubmit = async () => {
        try {
            updateFormState("loading", true);
            await deleteAccountValidationSchema.validate(formState, {
                abortEarly: false,
            });
            const payload = {
                name: formState?.name,
                email: formState?.email,
                countryCode: formState.countryCode === "US" ? "+1" : `+${formState.countryCode}`,
                number: formState?.number,
                reason: formState?.reason,
            };
            const data = await handleDeleteAccountRequest(payload);
            if (data?.status === 201) {
                successHandler(data?.message);
                updateFormState("showThankYouMessage", true);                
            }
        } catch (validationErrors) {
            if (validationErrors.inner) {
                const errors = {};
                validationErrors.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setFormErrors(errors);
            }
            updateFormState("showThankYouMessage", false);
        } finally {
            updateFormState("loading", false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderWithBack title={"Delete Account"} />

            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.imageWrapper}>
                    <Image source={ImagePicker.contactBanner} style={styles.image} />
                    <Text style={styles.text}>Need a Break? We’re Here for You</Text>
                    <Text style={styles.text2}>
                        We're always here to help. If something's not right or you're having trouble, let us know — we’d love the chance to make things better. But if you still decide to delete your account, we’ll make sure it’s a smooth process.
                    </Text>

                </View>

                <View style={styles.contentWrapper}>
                    <Text
                        style={[
                            styles.content,
                            { fontSize: Responsive.font(5), color: Colors.blackColor },
                        ]}
                    >
                        {helpSupportContent.text1}
                    </Text>
                    <Text style={styles.content}>{helpSupportContent.text2}</Text>
                </View>

                <View style={styles.loginInputWrapper}>
                    <CustomInputField
                        name="name"
                        label="Full Name"
                        value={formState.name}
                        onTextChange={handleChangeText}
                        placeholder="Enter Full Name"
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        containerStyle={styles.containerStyle}
                        mainContainerStyle={styles.mainContainer}
                        labelStyle={styles.labelStyle}
                        inputStyle={styles.inputStyle}
                        isRequired={true}
                    />

                    <CustomInputField
                        name="email"
                        label="Email"
                        value={formState.email}
                        onTextChange={handleChangeText}
                        placeholder="Enter Email"
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        containerStyle={styles.containerStyle}
                        mainContainerStyle={styles.mainContainer}
                        labelStyle={styles.labelStyle}
                        inputStyle={styles.inputStyle}
                        isRequired={true}

                    />

                    <PhoneNumberInput
                        label="Phone Number"
                        defaultValue={formState.number}
                        defaultCode={formState.countryCode}
                        onChangePhone={handlePhoneChange}
                        onChangeCountryCode={(code) => updateFormState("countryCode", code)}
                        error={!!formErrors.number}
                        errorMessage={formErrors.number}
                        isRequired={true}
                    />

                    <CustomInputField
                        name="reason"
                        label="Reason"
                        value={formState.reason}
                        onTextChange={handleChangeText}
                        placeholder="Write your reason here"
                        error={!!formErrors.reason}
                        helperText={formErrors.reason}
                        containerStyle={styles.containerStyle}
                        mainContainerStyle={styles.mainContainer}
                        labelStyle={[styles.labelStyle, { alignSelf: "flex-start" }]}
                        inputStyle={styles.inputStyle}
                        isRequired={true}

                    />

                    {
                        formState.loading ? <Loader visible={formState.loading} /> : formState.showThankYouMessage ?

                            <Text style={styles.content}>{helpSupportContent.text3}</Text>
                            :
                            <ButtonComponent
                                title={"Confirm Delete"}
                                onPress={handleSubmit}
                                style={styles.buttonStyle}
                            />
                    }
                </View>


                <EarnPointsCard />

                <RazcoFoodDescription />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
    },
    imageWrapper: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "flex-start",
    },

    image: {
        height: Responsive.heightPx(20),
        width: Responsive.widthPx(110),
        resizeMode: "stretch",
    },
    text: {
        position: "absolute",
        top: Responsive.heightPx(1),
        fontFamily: "SemiBold",
        fontSize: Responsive.font(4),
        width: Responsive.widthPx(40),
        marginLeft: Responsive.widthPx(3),
    },
    text2: {
        position: "absolute",
        top: Responsive.heightPx(7),
        fontFamily: "SemiBold",
        fontSize: Responsive.font(3),
        width: Responsive.widthPx(65),
        marginLeft: Responsive.widthPx(3),
    },

    headingStyle: {
        fontSize: Responsive.font(5),
        color: Colors.blackColor,
        fontFamily: "SemiBold",
    },
    contentWrapper: {
        paddingHorizontal: Responsive.widthPx(5),
        paddingVertical: Responsive.heightPx(3),
    },
    content: {
        fontSize: Responsive.font(4),
        flexDirection: "column",
        paddingVertical: Responsive.heightPx(1),
        textAlign: "justify",
        color: "grey",
    },

    location: {
        fontSize: Responsive.font(3.5),
        color: "grey",
        fontFamily: "SemiBold",
        marginTop: Responsive.heightPx(0.5),
    },
    locationWrapper: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },

    loginInputWrapper: {
        paddingHorizontal: Responsive.widthPx(5),
        marginTop: Responsive.heightPx(2),
    },

    containerStyle: {
        marginBottom: Responsive.heightPx(1),
        borderRadius: 20,
    },

    labelStyle: {
        color: Colors.secondaryBlackColor,
        fontSize: Responsive.font(3.5),
        marginBottom: Responsive.heightPx(1),
    },
    inputStyle: {
        flex: 1,
    },
    mainContainer: {
        backgroundColor: Colors.skyBlueColor,
        height: Responsive.heightPx(7),
        borderRadius: 10,
    },
    buttonStyle: {
        marginBottom: Responsive.heightPx(3),
        marginVertical: Responsive.heightPx(4),
    },
    dropdownStyle: {
        backgroundColor: Colors.whiteColor,
        borderWidth: 1,
        paddingVertical: Responsive.heightPx(2),
        borderRadius: 10,
    },
    selectContainerStyle: {
        marginVertical: Responsive.heightPx(2),
        backgroundColor: Colors.whiteColor,
    },
    errorText: {
        color: "red",
        marginTop: Responsive.heightPx(1),
        fontSize: Responsive.font(3),
    },
});
