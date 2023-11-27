import User from "../models/userModel.js"
import Organisation from "../models/orgModel.js";
import bcrypt from "bcrypt"

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message : "User doesn't exist"});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials."});
        res.status(200).json({userData: existingUser});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}



export const continueSignup = async (req, res) => {
    const {
        email,
        password,
        confirmPassword,
        name,
        phoneNumber
    } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        res.status(200).json({
            name,email,phoneNumber,password
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
export const signupUser = async (req, res) => {
    const {
        email,
        password,
        name,
        phoneNumber,
        gender,
        age,
        aadharNumber,
        Description,
        type
    } = req.body;
    console.log(req.body)
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userData = await User.create({
            email,
            password: hashedPassword,
            name,
            phoneNumber,
            gender,
            age,
            aadharNumber,
            Description,
            type,
        });

        res.status(200).json({
            name: userData.name,
            description: userData.Description,
            type: userData.type,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const signupOrganisation = async (req, res) => {
    const {
        email,
        password,
        name,
        orgName,
        phoneNumber,
        type,
        address,
        city,
        state,
        description
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const organisationData = await Organisation.create({
            email,
            password: hashedPassword,
            name,
            orgName,
            phoneNumber,
            type,
            address,
            city,
            state,
            description
        });

        res.status(200).json({
            name: organisationData.name,
            orgName: organisationData.orgName,
            phoneNumber: organisationData.phoneNumber,
            type: organisationData.type,
            address: organisationData.address,
            city: organisationData.city,
            state: organisationData.state,
            description: organisationData.description
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
