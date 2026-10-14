const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick() {
    const isDark = document.body.classList.toggle("dark");
    themeButton.textContent = isDark
        ? "라이트 테마로 바꾸기"
        : "다크 테마로 바꾸기";
}
function handleNicknameInput() {
    const currentLength = nicknameInput.value.length;
    nicknameCount.textContent = currentLength + " / 10";
}
function handleAgreeChange() {
    const agreed = agreeCheck.checked;
    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed
        ? "훈련을 시작할 수 있습니다."
        : "동의 후 훈련을 시작할 수 있습니다.";
    if (agreed) {
        agreeMessage.classList.add("is-ready");
    } else {
        agreeMessage.classList.remove("is-ready");
    }
}
themeButton.addEventListener("click", handleThemeClick);
nicknameInput.addEventListener("input", handleNicknameInput);
agreeCheck.addEventListener("change", handleAgreeChange);
// 7주차에서는 같은 버튼에 준비 흐름 진입을 연결합니다.
if (!document.querySelector("#flow")) {
    startButton.addEventListener("click", () => {
        document.querySelector("#practice").scrollIntoView();
        tabs[0].focus();
    });
}
const topicSearch = document.querySelector("#topicSearch");
const difficultyFilter = document.querySelector("#difficultyFilter");
const topicCards = document.querySelectorAll(".topicCard");
const topicMessage = document.querySelector("#topicMessage");

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

function updateTopicList() {
    const search = topicSearch.value.trim().toLowerCase();
    const level = difficultyFilter.value;
    let visibleCount = 0;
    topicCards.forEach((card) => {
        const matchesSearch = card.dataset.title.toLowerCase().includes(search);
        const matchesLevel = level === "all" || card.dataset.level === level;
        const isVisible = matchesSearch && matchesLevel;
        card.classList.toggle("isHidden", !isVisible);
        if (isVisible) visibleCount += 1;
    });
    topicMessage.textContent = visibleCount === 0 ? "조건에 맞는 연습이 없어요. 검색어나 난이도를 바꿔 보세요." : `연습 ${visibleCount}개를 찾았어요.`;
}

tabs.forEach((button, index) => {
    button.addEventListener("click", handleTabClick);
    button.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index + tabs.length - 1) % tabs.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = tabs.length - 1;
        } else {
            return;
        }
        event.preventDefault();
        resetTabsAndPanels();
        activateTab(tabs[nextIndex]);
        tabs[nextIndex].focus();
    });
});
topicSearch.addEventListener("input", updateTopicList);
difficultyFilter.addEventListener("change", updateTopicList);

document.querySelectorAll("[data-start-topic]").forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".topicCard");
        document.querySelectorAll("[data-start-topic]").forEach((item) => {
            item.closest(".topicCard").classList.remove("isSelected");
            item.textContent = "이 연습 시작";
            item.setAttribute("aria-pressed", "false");
        });
        card.classList.add("isSelected");
        topicMessage.textContent = `${button.dataset.startTopic} 연습을 선택했어요. 발표를 시작해 보세요.`;
        button.textContent = "선택됨";
        button.setAttribute("aria-pressed", "true");
    });
});

document.querySelector("#subscribeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#subscribeMessage");
    const button = document.querySelector("#subscribeButton");
    message.textContent = `${email} 입력을 확인했어요. 시연 화면이므로 실제 신청이나 메일 발송은 하지 않아요.`;
    button.textContent = "입력 확인 완료";
    button.disabled = true;
});
document.querySelector("#email").addEventListener("input", () => {
    document.querySelector("#subscribeButton").disabled = false;
    document.querySelector("#subscribeButton").textContent = "알림 신청";
    document.querySelector("#subscribeMessage").textContent = "";
});
resetTabsAndPanels();
activateTab(tabs[0]);
