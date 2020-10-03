import Newsletter from "../models/newsletter.model";
import time_alert from "../config/time_alert";
import sendMail from "../utils/email.util";
import welcomeMail from "../documents/emails/welcome";

exports.index = async function (req, res) {
  try {
    const allDocuments = await Newsletter.find({});

    return res.status(200).send({
      success: true,
      message: "Dados encontrados com sucesso.",
      object: allDocuments,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

exports.create = async function (req, res) {
  try {
    let newsletter = new Newsletter({
      name: req.body.name,
      email: req.body.email,
    });

    if (await Newsletter.findOne({ email: newsletter.email }).exec()) {
      res.status(200).send({
        success: false,
        message: "Este e-mail já está cadastrado para receber os alertas.",
      });
      return false;
    }

    newsletter.save(function (err) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Não foi possível completar a operação.",
        });
        return false;
      }

      sendWelcomeMail(newsletter.name, newsletter.email);

      res.status(200).send({
        success: true,
        message: `Você foi adicionad@ à lista de alertas com sucesso! ${time_alert.legend} antes do prazo de cada tarefa, um e-mail será enviado para ${newsletter.email}.`,
      });
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Não foi possível completar a operação. ${err}.`,
    });
  }
};

exports.delete = async function (req, res) {
  Newsletter.findByIdAndRemove(req.params.id, function (err) {
    if (err)
      res.status(500).send({
        success: false,
        message: "Não foi possível completar a operação.",
      });
    else
      res.status(200).send({
        success: true,
        message: "Você foi removido da lista de alertas com sucesso.",
      });
  });
};

exports.deleteAll = async function (req, res) {
  Newsletter.deleteMany({}, function (err) {
    if (err)
      res.status(500).send({
        success: false,
        message: "Não foi possível completar a operação.",
      });
    else
      res.status(200).send({
        success: true,
        message: "Todas as pessoas cadastradas na newsletter foram removidas.",
      });
  });
};

exports.getAllSubscribers = async function () {
  return await Newsletter.find({}, "email");
};

function sendWelcomeMail(name, email) {
  sendMail({
    to: email,
    subject: `Boas vindas ${name}`,
    html: welcomeMail,
  });
}
