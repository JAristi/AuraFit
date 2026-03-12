const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
    try {
        await userRepository.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role || "user"
        });
        res.send({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await userRepository.findByEmail(req.body.email);
        if (!user) return res.status(404).send({ message: "User Not found." });

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.googleSignin = async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        let user = await userRepository.findByEmail(email);

        if (!user) {
            user = await userRepository.create({
                name: name,
                email: email,
                googleId: googleId,
                password: null,
                role: "user"
            });
        } else if (!user.googleId) {
            await user.update({ googleId: googleId });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            accessToken: token
        });
    } catch (err) {
        console.error("Google Sign-In error:", err.message);
        res.status(401).send({ message: "Token de Google inválido o expirado." });
    }
};
