function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var processo = getValue("WKNumProces");
    var aprovado = DatasetFactory.createConstraint(
        "workflowProcessPK.processInstanceId", processo, processo,
        ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("workflowProcess", null, [aprovado], null);
       
    var statusProcess = dataset.getValue(0, "statusProcess");

    if (statusProcess == 0) {
        statusProcess = "Aberto";
    } else if (statusProcess == 1) {
        statusProcess = "Cancelado";
    } else if (statusProcess == 2) {
        statusProcess = "Finalizado";
    }
    hAPI.setCardValue("status", statusProcess);
}
