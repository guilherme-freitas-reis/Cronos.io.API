import Email from "../models/email.model";

exports.create = async function (req, res) {
  try {
    let email = new Email({
      email: req.body.email,
    });

    if (await Email.findOne({ email: email.email }).exec()) {
      res.status(200).send({
        success: false,
        message: "Este e-mail já está cadastrado para receber os alertas.",
      });
      return false;
    }

    email.save(function (err) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Não foi possível completar a operação.",
        });
        return false;
      }

      res.status(200).send({
        success: true,
        message: `Você está pronto para receber os alertas em seu e-mail.`,
      });
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Não foi possível completar a operação. ${err}.`,
    });
  }
};
