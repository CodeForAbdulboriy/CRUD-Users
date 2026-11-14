require("dotenv/config");
const { User, CodeStorage } = require("../modules/modules.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class userController {
    async get(req, res) {
        const data = await User.findAll();
        res.json(data);
    }

    async reg(req, res) {

        try {
            const { name, email, password } = req.body;

            if(!name || !email || !password) {
                return res.status(400).json({
                    message: "Все поля должны быть заполнены!"
                });
            }

            if(password.length < 5) {
                return res.status(400).json({
                    message: "пароль должен содержать не менее 4 символов!"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const checkEmail = await User.findOne({
                where: {
                    email: email
                }
            });

            if(checkEmail) {
                return res.status(400).json({
                    message: "Данный email уже используется!"
                });
            }

            await User.create({
                name: name,
                email: email,
                password: hashedPassword,
                status: "временная регистрация"
            });

            const verificationCode = crypto.randomInt(100000, 1000000).toString();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

            await CodeStorage.create({
                code: verificationCode,
                expiresAt: expiresAt
            });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL,
                    pass: process.env.PASS
                }
            });

            await transporter.sendMail({
                from: process.env.GMAIL,
                to: email,
                subject: "Верификация почты",
                text: `Ваш код верификации: ${verificationCode}`
            });

            return res.json({
                message: "Код для верификации почты был отправлен на указанную вами почту."
            });
        }
        catch(error) {
            console.error("Ошибка регистрации:", error);

            return res.status(500).json({
                message: "Внутренняя ошибка сервера"
            });
        }
    }

    async verify(req, res) {
        try {
            const { email, code } = req.body;

            const checkCode = await CodeStorage.findOne({
                where: {
                    code: code
                }
            });

            if(!checkCode) {
                return res.status(400).json({
                    message: "Данный код неверный!"
                });
            }

            if(Date.now() > checkCode.expiresAt) {
                return res.status(401).json({
                    message: "Срок действия кода истёк."
                });
            }

            await User.update(
                {
                    status: "зарегистрированный"
                },
                {
                    where: {
                        email: email
                    }
                }
            );

            await CodeStorage.destroy({
                where: {
                    code: checkCode.code
                }
            });

            res.status(201).json({
                message: "Вы успешно авторизовались."
            });
        }
        catch(error) {
            return res.status(500).json(`Ошибка сервера: ${error}`);
        }
    }

    async delete(req, res) {
        try {
            const { name } = req.body;

            const checkName = await User.findOne({
                where: {
                    name: name
                }
            });

            if(!checkName) {
                return res.status(400).json({
                    message: "Данный пользователь не существует!"
                });
            }

            await User.destroy({
                where: {
                    name: name
                }
            });

            return res.status(200).json({
                message: "Пользователь успешно удален!"
            });
        }
        catch(error) {
            res.status(500).json({
                message: error
            });
        }
    }

    async login(req, res) {
        const { name, email, password } = req.body;

        const checkUser = await User.findOne({
            where: {
                name: name,
                email: email
            }
        });

        if(!checkUser) {
            return res.status(400).json({
                message: "Неверный email или name"
            });
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);

        if(!checkPassword) {
            return res.status(400).json({
                message: "Неверно указанный пароль!"
            });
        }

        if(checkUser.status !== "зарегистрированный") {
            return res.status(400).json({
                message: "Данный аккаунт не зарегистрирован."
            });
        }

        const token = await jwt.sign(
            {id: checkUser.id},
            process.env.JWT_KEY,
            { expiresIn: process.env.EXPIRIES_IN }
        );

        return res.status(200).json({
            message: "Авторизация успешна!",
            token
        });
    }

    async getProfile(req, res) {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: {
                    exclude: ["password"]
                }
            });

            if(!user) {
                return res.status(400).json({
                    message: "Данный пользователь не существует."
                });
            }

            return res.status(200).json({
                user
            });            
        }
        catch(error) {
            return res.status(500).json({
                message: error
            });
        }
    }
}

module.exports = new userController;