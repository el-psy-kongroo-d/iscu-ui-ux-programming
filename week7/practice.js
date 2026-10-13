const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const topicSearch = document.querySelector("#topicSearch");
const difficultyFilter = document.querySelector("#difficultyFilter");
const topicCards = document.querySelectorAll(".topicCard");
const topicMessage = document.querySelector("#topicMessage");

function showTab(tabName) {
    tabButtons.forEach((button) => {
        const isActive = button.dataset.tab === tabName;
        button.classList.toggle("isActive", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive ? 0 : -1;
    });
    tabPanels.forEach((panel) => {
        const isVisible = panel.dataset.panel === tabName;
        panel.classList.toggle("isVisible", isVisible);
        panel.hidden = !isVisible;
    });
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

tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => showTab(button.dataset.tab));
    button.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % tabButtons.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index + tabButtons.length - 1) % tabButtons.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = tabButtons.length - 1;
        } else {
            return;
        }
        event.preventDefault();
        showTab(tabButtons[nextIndex].dataset.tab);
        tabButtons[nextIndex].focus();
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
showTab("basic");
