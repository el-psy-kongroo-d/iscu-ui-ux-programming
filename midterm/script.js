const startButton = document.querySelector("#startButton");
const themeButton = document.querySelector("#themeButton");
function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");

    themeButton.textContent = isDark ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() { 
    tabs.forEach(function (tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
        tab.tabIndex = -1;
    });
    panels.forEach(function (panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab) { 
    const targetSelector = clickedTab.dataset.target;
    const targetPanel = document.querySelector(targetSelector);

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");
    clickedTab.tabIndex = 0;

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event) { 
    resetTabsAndPanels();
    activateTab(event.currentTarget);
}

tabs.forEach(function (tab, index) {
    tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
    tab.addEventListener("click", handleTabClick);
    tab.addEventListener("keydown", event => {
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        resetTabsAndPanels();
        activateTab(tabs[next]);
        tabs[next].focus();
    });
});

const planFlow = document.querySelector("#plan-flow");
const flowSteps = planFlow.querySelectorAll(".step");
const progressItems = planFlow.querySelectorAll(".progress__item");
const titleInput = document.querySelector("#topic-input");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const durationRange = document.querySelector("#duration-range");
const durationValue = document.querySelector("#duration-value");
const reviewOption = document.querySelector("#review-option");
const reviewOptions = document.querySelector("#review-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summaryDuration = document.querySelector("#summary-duration");
const summaryReview = document.querySelector("#summary-review");
const durationValues = ["15", "30", "60"];

const planDraft = {
    title: "", duration: "30", review: false, reviewCount: "2"
};

function showStep(index) {
    flowSteps.forEach((step, i) => { step.hidden = i !== index; });
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
        if (i === index) item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
    });
    const heading = flowSteps[index].querySelector("h3");
    heading.tabIndex = -1;
    heading.focus();
}

const introDialog = document.querySelector("#plan-intro");
const introBack = document.querySelector("#intro-back");
const introStart = document.querySelector("#intro-start");

startButton.addEventListener("click", () => introDialog.showModal());
introBack.addEventListener("click", () => introDialog.close());
introStart.addEventListener("click", () => {
    introDialog.close();
    planFlow.hidden = false;
    if (savePlan.disabled) restartButton.click();
    showStep(0);
    titleInput.focus();
});

function validateTitle() {
    const value = titleInput.value.trim();
    if (!value) {
        titleError.textContent = "오늘 공부할 학습 주제를 입력해주세요.";
        titleInput.classList.add("has-error");
        titleInput.setAttribute("aria-invalid", "true");
        titleInput.focus();
        return false;
    }
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    titleInput.removeAttribute("aria-invalid");
    planDraft.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if (!validateTitle()) return;
    showStep(1);
});

durationRange.addEventListener("input", () => {
    durationValue.value = durationValues[durationRange.value] + "분";
    durationRange.setAttribute("aria-valuetext", durationValue.value);
});
reviewOption.addEventListener("change", () => {
    reviewOptions.hidden = !reviewOption.checked;
});

optionPrev.addEventListener("click", () => showStep(0));
optionNext.addEventListener("click", () => {
    planDraft.duration = durationValues[durationRange.value];
    planDraft.review = reviewOption.checked;
    const count = document.querySelector('input[name="review-count"]:checked');
    planDraft.reviewCount = count.value;
    summaryTitle.textContent = planDraft.title;
    summaryDuration.textContent = planDraft.duration + "분";
    summaryReview.textContent = planDraft.review ? "복습 문제 " + planDraft.reviewCount + "개" : "복습 없음";
    showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));
finishButton.addEventListener("click", () => showStep(3));
restartButton.addEventListener("click", () => {
    planDraft.title = "";
    planDraft.duration = "30";
    planDraft.review = false;
    planDraft.reviewCount = "2";
    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    titleInput.removeAttribute("aria-invalid");
    durationRange.value = "1";
    durationValue.value = "30분";
    durationRange.setAttribute("aria-valuetext", "30분");
    reviewOption.checked = false;
    reviewOptions.hidden = true;
    document.querySelector('input[name="review-count"][value="2"]').checked = true;
    summaryTitle.textContent = "";
    summaryDuration.textContent = "";
    summaryReview.textContent = "";
    savePlan.disabled = false;
    saveMessage.textContent = "";
    showStep(0);
    titleInput.focus();
});

// 페이지 내 메모리로만 보관하며, 새 계획을 설정해도 목록은 유지합니다.
const plans = [];
let nextPlanId = 1;
let pendingCancelId = null;
const savePlan = document.querySelector("#save-plan");
const saveMessage = document.querySelector("#save-message");
const planList = document.querySelector("#plan-list");
const planEmpty = document.querySelector("#plan-empty");
const planMessage = document.querySelector("#plan-message");
const detailDialog = document.querySelector("#plan-detail");
const cancelDialog = document.querySelector("#cancel-dialog");

function renderPlans() {
    planList.replaceChildren();
    planEmpty.hidden = plans.length > 0;
    document.querySelector("#plan-count").textContent = plans.length + "개";
    plans.forEach(plan => {
        const item = document.createElement("li");
        const title = document.createElement("h3");
        title.textContent = plan.title;
        const description = document.createElement("p");
        description.textContent = plan.duration + "분 · " + (plan.review ? "복습 문제 " + plan.reviewCount + "개" : "복습 없음");
        item.append(title, description);
        const actions = document.createElement("div");
        actions.className = "step-actions";
        [["open", "다시 열기"], ["cancel", "계획 취소"]].forEach(([action, label]) => {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.action = action;
            button.dataset.id = plan.id;
            button.textContent = label;
            button.setAttribute("aria-label", plan.title + " · " + label);
            actions.append(button);
        });
        item.append(actions);
        planList.append(item);
    });
}

savePlan.addEventListener("click", () => {
    if (savePlan.disabled || !planDraft.title) return;
    plans.push({ ...planDraft, id: nextPlanId++ });
    renderPlans();
    savePlan.disabled = true;
    saveMessage.textContent = "‘" + planDraft.title + "’ 계획을 추가했어요. 아래 목록에서 다시 열 수 있어요.";
    planMessage.textContent = "계획을 추가했어요. 다시 열어 내용을 확인하거나 새 계획을 만들어 보세요.";
});

planList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const plan = plans.find(plan => plan.id === Number(button.dataset.id));
    if (!plan) return;
    if (button.dataset.action === "open") {
        document.querySelector("#detail-title").textContent = plan.title;
        document.querySelector("#detail-duration").textContent = plan.duration + "분";
        document.querySelector("#detail-review").textContent = plan.review ? "복습 문제 " + plan.reviewCount + "개" : "복습 없음";
        detailDialog.showModal();
    } else {
        pendingCancelId = plan.id;
        document.querySelector("#cancel-description").textContent = plan.title;
        cancelDialog.showModal();
    }
});

document.querySelector("#detail-close").addEventListener("click", () => detailDialog.close());
document.querySelector("#cancel-keep").addEventListener("click", () => {
    pendingCancelId = null;
    cancelDialog.close();
    planMessage.textContent = "취소하지 않고 계획을 유지했어요.";
});
cancelDialog.addEventListener("cancel", () => {
    pendingCancelId = null;
    planMessage.textContent = "취소하지 않고 계획을 유지했어요.";
});
document.querySelector("#cancel-confirm").addEventListener("click", () => {
    const index = plans.findIndex(plan => plan.id === pendingCancelId);
    if (index < 0) return;
    const title = plans[index].title;
    plans.splice(index, 1);
    pendingCancelId = null;
    cancelDialog.close();
    renderPlans();
    planMessage.textContent = "‘" + title + "’ 계획을 취소했어요. 다른 계획을 열거나 새 계획을 만들어주세요.";
    (planList.querySelector("button") || document.querySelector("#empty-create")).focus();
});
document.querySelector("#empty-create").addEventListener("click", () => startButton.click());
renderPlans();
