import Task from "../models/task.model";
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
