const state = { step: 1, scenario: "" };
const panels = document.querySelectorAll("[data-step]");
const indicators = document.querySelectorAll("[data-step-indicator]");
const scenarioButtons = document.querySelectorAll("[data-scenario]");
const levelInput = document.querySelector("#practiceLevel");
const goalInput = document.querySelector("#practiceGoal");
const minutesInput = document.querySelector("#practiceMinutes");

function renderStep() {
    panels.forEach((panel) => { panel.hidden = Number(panel.dataset.step) !== state.step; });
    indicators.forEach((indicator) => {
        const isCurrent = Number(indicator.dataset.stepIndicator) === state.step;
        indicator.classList.toggle("isCurrent", isCurrent);
        if (isCurrent) {
            indicator.setAttribute("aria-current", "step");
        } else {
            indicator.removeAttribute("aria-current");
        }
    });
}

function clearErrors() {
    document.querySelectorAll(".formError").forEach((element) => { element.textContent = ""; });
    [levelInput, goalInput, minutesInput].forEach((input) => input.removeAttribute("aria-invalid"));
}

function goToStep(step) {
    state.step = step;
    renderStep();
    document.querySelector(`[data-step="${step}"] h3`).focus();
}

function selectScenario(scenario) {
    state.scenario = scenario;
    scenarioButtons.forEach((button) => {
        const isSelected = button.dataset.scenario === scenario;
        button.classList.toggle("isSelected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });
    document.querySelector("#scenarioError").textContent = "";
}

scenarioButtons.forEach((button) => {
    button.addEventListener("click", () => selectScenario(button.dataset.scenario));
});
document.querySelectorAll("[data-start-topic]").forEach((button) => {
    button.addEventListener("click", () => {
        selectScenario(button.dataset.startTopic);
        clearErrors();
        goToStep(1);
        document.querySelector("#topicMessage").textContent = `${state.scenario}을 선택했어요. 아래에서 목표와 시간을 정해 주세요.`;
    });
});

document.querySelector("#startFlow").addEventListener("click", () => {
    if (!state.scenario) {
        document.querySelector("#scenarioError").textContent = "발표 주제를 하나 선택한 뒤 다시 눌러 주세요.";
        scenarioButtons[0].focus();
        return;
    }
    goToStep(2);
});

document.querySelector("#confirmDetail").addEventListener("click", () => {
    clearErrors();
    const missing = [levelInput, goalInput, minutesInput].find((input) => !input.value.trim());
    if (missing) {
        const label = document.querySelector(`label[for="${missing.id}"]`).textContent.replace(" (필수)", "");
        document.querySelector("#detailError").textContent = `${label} 항목을 채운 뒤 연습 계획 확인을 눌러 주세요.`;
        missing.setAttribute("aria-invalid", "true");
        missing.focus();
        return;
    }
    document.querySelector("#summaryScenario").textContent = state.scenario;
    document.querySelector("#summaryLevel").textContent = levelInput.value;
    document.querySelector("#summaryGoal").textContent = goalInput.value.trim();
    document.querySelector("#summaryMinutes").textContent = `${minutesInput.value}분`;
    goToStep(3);
});

document.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => { clearErrors(); goToStep(Number(button.dataset.back)); }));
document.querySelector("#completeFlow").addEventListener("click", () => {
    document.querySelector("#completionMessage").textContent = `${state.scenario} / ${levelInput.value} / ${minutesInput.value}분. 오늘의 목표는 “${goalInput.value.trim()}”예요.`;
    goToStep(4);
});
document.querySelector("#restartFlow").addEventListener("click", () => {
    selectScenario("");
    [levelInput, goalInput, minutesInput].forEach((input) => { input.value = ""; });
    document.querySelectorAll(".summaryList dd, #completionMessage").forEach((element) => { element.textContent = ""; });
    document.querySelectorAll("[data-start-topic]").forEach((button) => {
        button.textContent = "이 연습 시작";
        button.setAttribute("aria-pressed", "false");
        button.closest(".topicCard").classList.remove("isSelected");
    });
    clearErrors();
    updateTopicList();
    goToStep(1);
});
renderStep();
