import User from "../users/user.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/JWT-generate.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.file)
    let profilePicture = req.file ? req.file.filename : null;
    console.log(profilePicture)
    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(data.password, salt);

    const user = await User.create({
      username: data.username,
      email: data.email,
      name: data.name,
      surname: data.surname,
      password: encryptedPassword,
      profilePicture
    });

    return res.status(200).json({
      message: "User has been added to database",
      userDetails: {
        user: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("No se pudo registrar el usuario"); 
  }
};

export const login = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const lowerEmail = email ? email.toLowerCase() : null;
    const lowerUsername = username ? username.toLowerCase() : null;

    const user = await User.findOne({
      $or: [{ email: lowerEmail }, { username: lowerUsername }],
    });

    if (!user) {
      return res.status(400).json({
        msg: "Credenciales incorrectas",
        error: "El email o nombre de usuario proporcionado no existe.",
      });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Credenciales incorrectas",
        error: "Contraseña inválida.",
      });
    }

    const token = await generarJWT(user.id, user.email);

    res.status(200).json({
      msg: "Inicio de sesión exitoso",
      userDetails: {
        username: user.username,
        token: token,
        profilePicture: user.profilePicture,
        uid: user.id
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "Error del servidor",
      error: "Comuníquese con el administrador",
    });
  }
};
