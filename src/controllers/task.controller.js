import Task from "../models/task.model";
import newsletter_controller from "../controllers/newsletter.controller";
import sendMail from "../utils/email.util";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-BR");

exports.index = async function (req, res) {
  try {
    const allDocuments = await Task.find({});

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
    let task = new Task({
      title: req.body.title,
      description: req.body.description,
      start: req.body.start || moment().utc().toDate(),
      end: req.body.end || moment().utc().toDate(),
    });

    task.save(function (err) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Não foi possível completar a operação.",
        });
        return false;
      }

      res.status(200).send({
        success: true,
        message: `Nova tarefa adicionada com sucesso.`,
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
  Task.findByIdAndRemove(req.params.id, function (err) {
    if (err)
      res.status(500).send({
        success: false,
        message: "Não foi possível completar a operação.",
      });
    else
      res.status(200).send({
        success: true,
        message: "Tarefa removida com sucesso.",
      });
  });
};

exports.deleteAll = async function (req, res) {
  Task.deleteMany({}, function (err) {
    if (err)
      res.status(500).send({
        success: false,
        message: "Não foi possível completar a operação.",
      });
    else
      res.status(200).send({
        success: true,
        message: "Todas as tarefas foram removidas.",
      });
  });
};

exports.send_daily_email = async function () {
  const today = new Date();

  const dailyTasks = await Task.find({
    start: { $gte: moment(today).hour(0) },
    end: { $lte: moment(today).hours(24).minutes(59) },
  });

  if (dailyTasks == []) return;

  const emailsList = await newsletter_controller.getAllSubscribers();

  if (emailsList == []) return;

  console.log(emailsList);

  dailyTasks.map((task) => {
    sendMail({
      to: [emailsList],
      subject: `Lembrete de tarefa: ${task.title}`,
      html: `
          <h1>Você tem uma tarefa para hoje!</h1>
          <br/>
          <br/>
          <p><strong>Título:</strong> ${task.title}</p>
          <p><strong>Descrição:</strong> ${task.description}</p>
          <p><strong>Data de Início:</strong> ${moment(task.start).format(
            "LLLL"
          )}</p>
          <p><strong>Data de Término:</strong> ${moment(task.end).format(
            "LLLL"
          )}</p>
      `,
    });
  });
};
