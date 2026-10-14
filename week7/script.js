const state = { step: 1, scenario: "" };
const flow = document.querySelector("#flow");
const steps = document.querySelectorAll("[data-step]");
const progress = document.querySelector("#practiceProgress");
const mode = document.querySelector("#practiceMode");
const place = document.querySelector("#meetingPlace");
const placeLabel = document.querySelector("#placeLabel");
const placeError = document.querySelector("#placeError");
const dialog = document.querySelector("#practiceConfirm");
const indicators = document.querySelectorAll("[data-step-indicator]");
const scenarioButtons = document.querySelectorAll("[data-scenario]");
const levelInput = document.querySelector("#practiceLevel");
const goalInput = document.querySelector("#practiceGoal");
const minutesInput = document.querySelector("#practiceMinutes");

function showStep(step) {
    state.step = step;
    steps.forEach((item) => {
        item.hidden = Number(item.dataset.step) !== step;
    });
    progress.textContent = step <= 3 ? `${step} / 3 · 준비 단계` : "준비 완료";
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
    [levelInput, goalInput, minutesInput, place].forEach((input) => input.removeAttribute("aria-invalid"));
    place.classList.remove("has-error");
}

function goToStep(step) {
    showStep(step);
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
        flow.hidden = false;
        selectScenario(button.dataset.startTopic);
        clearErrors();
        goToStep(1);
        document.querySelector("#topicMessage").textContent = `${state.scenario}을 선택했어요. 아래에서 목표와 시간을 정해 주세요.`;
    });
});

startButton.addEventListener("click", () => {
    flow.hidden = false;
    goToStep(1);
});
mode.addEventListener("change", () => {
    const meet = mode.value === "meet";
    place.hidden = !meet;
    placeLabel.hidden = !meet;
    place.setAttribute("aria-required", String(meet));
    if (!meet) {
        place.value = "";
        placeError.textContent = "";
        place.classList.remove("has-error");
        place.removeAttribute("aria-invalid");
    }
});

function showSummary() {
    const method = mode.value === "meet"
        ? `청중과 함께 연습 · ${place.value.trim()}`
        : "혼자 연습";
    document.querySelector("#summaryScenario").textContent = state.scenario;
    document.querySelector("#summaryLevel").textContent = levelInput.value;
    document.querySelector("#summaryGoal").textContent = goalInput.value.trim();
    document.querySelector("#summaryMinutes").textContent = `${minutesInput.value}분`;
    document.querySelector("#summaryMode").textContent = method;
}

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
    if (mode.value === "meet" && !place.value.trim()) {
        placeError.textContent = "함께 연습할 장소를 입력해 주세요.";
        place.classList.add("has-error");
        place.setAttribute("aria-invalid", "true");
        place.focus();
        return;
    }
    showSummary();
    goToStep(3);
});

document.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => { clearErrors(); goToStep(Number(button.dataset.back)); }));
document.querySelector("#completeFlow").onclick = () => dialog.showModal();
document.querySelector("#confirmCancel").onclick = () => dialog.close();
document.querySelector("#confirmSubmit").onclick = () => {
    dialog.close();
    document.querySelector("#completionMessage").textContent = `${state.scenario} / ${levelInput.value} / ${minutesInput.value}분. 오늘의 목표는 “${goalInput.value.trim()}”예요.`;
    goToStep(4);
};
document.querySelector("#restartFlow").addEventListener("click", () => {
    dialog.close();
    selectScenario("");
    mode.value = "meet";
    place.value = "";
    place.hidden = placeLabel.hidden = false;
    place.setAttribute("aria-required", "true");
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
showStep(1);
