## Ex03 To-Do List using JavaScript
## Date :17.11.2026
## AIM : 
To create a To-do Application with all features using JavaScript.

## ALGORITHM
## STEP 1
Build the HTML structure (index.html).

## STEP 2
Style the App (style.css).

## STEP 3
Plan the features the To-Do App should have.

## STEP 4
Create a To-do application using Javascript.

## STEP 5
Add functionalities.

## STEP 6
Test the App.

## STEP 7
Open the HTML file in a browser to check layout and functionality.

## STEP 8
Fix styling issues and refine content placement.

## STEP 9
Deploy the website.

## STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM : 
index.html : 
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f5f7f6" />
    <title>Daylight — your to-do list</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="style.css" />
    <script src="app.js" defer></script>
  </head>
  <body>
    <div class="app-shell">
      <aside class="sidebar" aria-label="Task navigation">
        <a class="brand" href="#" aria-label="Daylight home">
          <span class="brand-mark" aria-hidden="true">d</span>
          <span>daylight</span>
        </a>

        <div class="sidebar-label">WORKSPACE</div>
        <nav class="nav-list" aria-label="Views">
          <button class="nav-item is-active" type="button" data-filter="all">
            <span class="nav-icon" aria-hidden="true">▦</span>
            <span>All tasks</span>
            <span class="nav-count" id="all-count">0</span>
          </button>
          <button class="nav-item" type="button" data-filter="today">
            <span class="nav-icon" aria-hidden="true">◷</span>
            <span>Today</span>
            <span class="nav-count" id="today-count">0</span>
          </button>
          <button class="nav-item" type="button" data-filter="upcoming">
            <span class="nav-icon" aria-hidden="true">▤</span>
            <span>Upcoming</span>
          </button>
          <button class="nav-item" type="button" data-filter="completed">
            <span class="nav-icon" aria-hidden="true">✓</span>
            <span>Completed</span>
          </button>
        </nav>

        <div class="sidebar-label category-heading">CATEGORIES</div>
        <nav class="nav-list category-list" aria-label="Task categories">
          <button class="nav-item category-item" type="button" data-category="Personal">
            <span class="category-dot dot-lilac"></span><span>Personal</span>
          </button>
          <button class="nav-item category-item" type="button" data-category="Work">
            <span class="category-dot dot-blue"></span><span>Work</span>
          </button>
          <button class="nav-item category-item" type="button" data-category="Study">
            <span class="category-dot dot-yellow"></span><span>Study</span>
          </button>
          <button class="nav-item category-item" type="button" data-category="Other">
            <span class="category-dot dot-green"></span><span>Other</span>
          </button>
        </nav>

        <div class="sidebar-bottom">
          <div class="focus-card">
            <span class="focus-spark" aria-hidden="true">✳</span>
            <p>A little progress<br />adds up to a lot.</p>
            <span class="focus-caption">KEEP GOING</span>
          </div>
          <p class="sidebar-footnote">Made for your everyday ✦</p>
        </div>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <div class="breadcrumb"><span>Workspace</span><span class="crumb-separator">/</span><strong id="view-name">All tasks</strong></div>
          <div class="topbar-right">
            <span class="today-label" id="header-date"></span>
            <span class="avatar" aria-label="Your profile">Y</span>
          </div>
        </header>

        <div class="content-wrap">
          <section class="welcome-row">
            <div>
              <p class="eyebrow" id="greeting">A FRESH START</p>
              <h1 id="page-title">Your day, <span>your pace.</span></h1>
              <p class="subtitle">Make room for what matters. One task at a time.</p>
            </div>
            <div class="date-stamp" aria-hidden="true">
              <span class="date-stamp-day" id="date-day"></span>
              <span class="date-stamp-month" id="date-month"></span>
            </div>
          </section>

          <section class="overview-grid" aria-label="Task overview">
            <article class="overview-card overview-total">
              <span class="overview-icon icon-total" aria-hidden="true">▦</span>
              <div><p>Total tasks</p><strong id="stat-total">0</strong></div>
              <span class="overview-note">in your list</span>
            </article>
            <article class="overview-card">
              <span class="overview-icon icon-done" aria-hidden="true">✓</span>
              <div><p>Completed</p><strong id="stat-completed">0</strong></div>
              <span class="overview-note">look at you go</span>
            </article>
            <article class="overview-card">
              <span class="overview-icon icon-progress" aria-hidden="true">↗</span>
              <div><p>In progress</p><strong id="stat-active">0</strong></div>
              <span class="overview-note">you've got this</span>
            </article>
          </section>

          <section class="progress-panel" aria-label="Overall progress">
            <div class="progress-copy">
              <div><strong>Your progress</strong><span id="progress-label">A good time to get started</span></div>
              <strong class="progress-percent" id="progress-percent">0%</strong>
            </div>
            <div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div>
          </section>

          <section class="task-section" aria-labelledby="task-heading">
            <div class="section-heading">
              <div>
                <p class="eyebrow">YOUR LIST</p>
                <h2 id="task-heading">Tasks <span class="task-total" id="visible-count">0</span></h2>
              </div>
              <button class="text-button" id="clear-completed" type="button" hidden>Clear completed</button>
            </div>

            <form class="add-task-form" id="task-form">
              <label class="sr-only" for="task-input">What needs to get done?</label>
              <span class="add-plus" aria-hidden="true">+</span>
              <input id="task-input" name="title" type="text" maxlength="120" placeholder="What needs to get done?" autocomplete="off" required />
              <div class="form-options">
                <label class="sr-only" for="task-category">Category</label>
                <select id="task-category" name="category" aria-label="Task category">
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Other">Other</option>
                </select>
                <label class="sr-only" for="task-priority">Priority</label>
                <select id="task-priority" name="priority" aria-label="Task priority">
                  <option value="low">Low priority</option>
                  <option value="medium" selected>Medium priority</option>
                  <option value="high">High priority</option>
                </select>
                <label class="sr-only" for="task-due">Due date</label>
                <input id="task-due" name="dueDate" type="date" aria-label="Due date (optional)" />
                <button class="add-button" type="submit">Add task <span aria-hidden="true">↗</span></button>
              </div>
            </form>

            <div class="toolbar">
              <div class="filter-tabs" role="group" aria-label="Filter tasks">
                <button type="button" class="filter-tab is-selected" data-status="all">All</button>
                <button type="button" class="filter-tab" data-status="active">To do</button>
                <button type="button" class="filter-tab" data-status="completed">Done</button>
              </div>
              <label class="search-box">
                <span aria-hidden="true">⌕</span>
                <span class="sr-only">Search tasks</span>
                <input id="search-input" type="search" placeholder="Search tasks..." autocomplete="off" />
                <kbd>/</kbd>
              </label>
              <label class="sort-select">
                <span class="sr-only">Sort tasks</span>
                <select id="sort-select">
                  <option value="created">Recently added</option>
                  <option value="due">Due date</option>
                  <option value="priority">Priority</option>
                  <option value="alpha">Alphabetical</option>
                </select>
              </label>
            </div>

            <div class="task-list" id="task-list" aria-live="polite"></div>
            <div class="empty-state" id="empty-state" hidden>
              <span class="empty-illustration" aria-hidden="true">✳</span>
              <h3 id="empty-title">Nothing on your list yet</h3>
              <p id="empty-copy">Add a task above and make today count.</p>
            </div>
          </section>
          <footer class="page-footer"><span>Small steps, steady progress.</span><span>✦</span></footer>
        </div>
      </main>
    </div>

    <dialog class="edit-dialog" id="edit-dialog" aria-labelledby="edit-title">
      <form id="edit-form" method="dialog">
        <div class="dialog-heading">
          <div><p class="eyebrow">MAKE A CHANGE</p><h2 id="edit-title">Edit task</h2></div>
          <button class="icon-button dialog-close" type="button" aria-label="Close dialog">×</button>
        </div>
        <label for="edit-task-title">Task name</label>
        <input id="edit-task-title" name="title" type="text" maxlength="120" required />
        <div class="dialog-fields">
          <div><label for="edit-category">Category</label><select id="edit-category" name="category">
            <option>Personal</option><option>Work</option><option>Study</option><option>Other</option>
          </select></div>
          <div><label for="edit-priority">Priority</label><select id="edit-priority" name="priority">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select></div>
        </div>
        <label for="edit-due-date">Due date <span class="optional-label">optional</span></label>
        <input id="edit-due-date" name="dueDate" type="date" />
        <div class="dialog-actions">
          <button class="cancel-button" type="button" id="cancel-edit">Cancel</button>
          <button class="add-button" type="submit">Save changes <span aria-hidden="true">↗</span></button>
        </div>
      </form>
    </dialog>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>
  </body>
</html>
```
style.css:
```
:root {
  font-family: "DM Sans", sans-serif;
  color: #242d2b;
  background: #f5f7f6;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  --ink: #242d2b;
  --muted: #89918f;
  --line: #e9edeb;
  --green: #2e7d64;
  --green-dark: #24644f;
  --green-light: #e8f3ee;
  --panel: #fff;
}

* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; min-height: 100vh; }
button, input, select { font: inherit; }
button { cursor: pointer; }
.app-shell { min-height: 100vh; }

.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 246px;
  padding: 31px 18px 22px;
  background: #fff;
  border-right: 1px solid var(--line);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 54px 7px;
  color: var(--ink);
  text-decoration: none;
  font: 800 21px "Manrope", sans-serif;
  letter-spacing: -1.1px;
}
.brand-mark {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 11px;
  color: white;
  background: #347d66;
  font: 800 22px "Manrope", sans-serif;
}
.sidebar-label {
  margin: 0 0 12px 10px;
  color: #a0a8a5;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.2px;
}
.nav-list { display: grid; gap: 4px; }
.nav-item {
  display: flex;
  align-items: center;
  min-height: 42px;
  gap: 12px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #697270;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  transition: background .16s ease, color .16s ease;
}
.nav-item:hover { background: #f5f8f6; color: var(--ink); }
.nav-item.is-active { background: #edf5f1; color: #2f765f; font-weight: 700; }
.nav-icon { width: 17px; color: #85908c; text-align: center; font-size: 17px; }
.nav-item.is-active .nav-icon { color: #347d66; }
.nav-count { margin-left: auto; color: #909a96; font-size: 11px; }
.category-heading { margin-top: 37px; }
.category-list { gap: 2px; }
.category-item { min-height: 37px; font-size: 12px; }
.category-dot { width: 8px; height: 8px; margin: 0 4px; border-radius: 50%; }
.dot-lilac { background: #a893d5; }
.dot-blue { background: #75a8d1; }
.dot-yellow { background: #e5b853; }
.dot-green { background: #79b493; }
.sidebar-bottom { margin-top: auto; }
.focus-card {
  position: relative;
  min-height: 129px;
  padding: 17px 15px 13px;
  overflow: hidden;
  border: 1px solid #e8eee9;
  border-radius: 12px;
  background: linear-gradient(140deg, #f8faf6, #edf5ef);
}
.focus-spark { position: absolute; top: 11px; right: 15px; color: #4a9477; font-size: 19px; }
.focus-card p { margin: 0 0 16px; font: 700 14px/1.5 "Manrope", sans-serif; letter-spacing: -.3px; }
.focus-caption { color: #84928a; font-size: 9px; font-weight: 700; letter-spacing: 1.2px; }
.sidebar-footnote { margin: 17px 0 0; color: #a1a9a6; text-align: center; font-size: 10px; }

.main-content { min-height: 100vh; margin-left: 246px; }
.topbar {
  display: flex;
  height: 69px;
  align-items: center;
  justify-content: space-between;
  padding: 0 54px;
  border-bottom: 1px solid var(--line);
  background: rgba(255,255,255,.72);
}
.breadcrumb { display: flex; align-items: center; gap: 11px; color: #929b98; font-size: 12px; }
.breadcrumb strong { color: #3a4541; font-weight: 600; }
.crumb-separator { color: #c3cac7; }
.topbar-right { display: flex; align-items: center; gap: 17px; }
.today-label { color: #78827e; font-size: 11px; }
.avatar { display: grid; width: 30px; height: 30px; place-items: center; border: 2px solid #fff; border-radius: 50%; background: #dceddf; color: #36795f; font-size: 12px; font-weight: 700; box-shadow: 0 0 0 1px #e6ece8; }
.content-wrap { width: min(100% - 108px, 1120px); margin: 0 auto; padding: 38px 0 24px; }
.welcome-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 27px; }
.eyebrow { margin: 0 0 10px; color: #438269; font-size: 9px; font-weight: 700; letter-spacing: 1.55px; }
h1, h2, h3, p { margin-top: 0; }
h1 { margin-bottom: 7px; color: #25302c; font: 700 clamp(25px, 3vw, 33px)/1.2 "Manrope", sans-serif; letter-spacing: -1.5px; }
h1 span { color: #49876d; }
.subtitle { margin: 0; color: #8a9490; font-size: 12px; }
.date-stamp { display: flex; width: 62px; height: 67px; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #e4ebe6; border-radius: 12px; background: #fff; box-shadow: 0 4px 12px rgba(27,51,39,.025); }
.date-stamp-day { color: #33423b; font: 700 22px "Manrope", sans-serif; line-height: 1; }
.date-stamp-month { margin-top: 5px; color: #7d8a83; font-size: 9px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; }

.overview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; }
.overview-card { display: flex; min-height: 91px; align-items: center; gap: 13px; padding: 15px 17px; border: 1px solid #e9eeeb; border-radius: 11px; background: #fff; }
.overview-icon { display: grid; width: 38px; height: 38px; flex: 0 0 auto; place-items: center; border-radius: 10px; font-size: 17px; }
.icon-total { background: #edf4ef; color: #458168; }
.icon-done { background: #eef2fa; color: #7385b8; }
.icon-progress { background: #fbf3e7; color: #c4974b; }
.overview-card p { margin: 0 0 2px; color: #87918d; font-size: 10px; }
.overview-card strong { color: #2c3732; font: 700 20px "Manrope", sans-serif; }
.overview-note { align-self: flex-end; margin: 0 0 4px auto; color: #adb5b1; font-size: 9px; white-space: nowrap; }
.progress-panel { margin-top: 14px; padding: 16px 18px 15px; border: 1px solid #e9eeeb; border-radius: 11px; background: #fff; }
.progress-copy { display: flex; justify-content: space-between; align-items: center; margin-bottom: 11px; }
.progress-copy > div { display: flex; align-items: baseline; gap: 11px; }
.progress-copy > div strong { color: #3a4540; font-size: 11px; }
.progress-copy > div span { color: #a0a9a5; font-size: 10px; }
.progress-percent { color: #428268; font: 700 12px "Manrope", sans-serif; }
.progress-track { height: 5px; overflow: hidden; border-radius: 99px; background: #edf1ee; }
.progress-fill { width: 0; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #72af90, #347d66); transition: width .3s ease; }

.task-section { margin-top: 34px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; margin-bottom: 15px; }
.section-heading .eyebrow { margin-bottom: 5px; font-size: 9px; }
h2 { margin: 0; color: #29342f; font: 700 21px "Manrope", sans-serif; letter-spacing: -.7px; }
.task-total { display: inline-grid; min-width: 22px; height: 22px; place-items: center; margin-left: 4px; border-radius: 7px; background: #eaf2ed; color: #4b8269; font: 600 10px "DM Sans", sans-serif; vertical-align: 3px; }
.text-button { padding: 7px 0; border: 0; background: transparent; color: #73827a; font-size: 10px; }
.text-button:hover { color: #b35454; }
.add-task-form { display: flex; min-height: 57px; align-items: center; gap: 11px; padding: 8px 9px 8px 14px; border: 1px solid #dfe9e2; border-radius: 10px; background: #fff; box-shadow: 0 3px 12px rgba(45,76,57,.025); }
.add-plus { display: grid; width: 24px; height: 24px; flex: 0 0 auto; place-items: center; border-radius: 7px; background: #e9f3ed; color: #478369; font-size: 20px; font-weight: 400; }
.add-task-form > input[type="text"] { min-width: 90px; flex: 1; padding: 8px 0; border: 0; outline: 0; color: #39443f; font-size: 11px; }
input::placeholder { color: #a6afab; }
.form-options { display: flex; align-items: center; gap: 7px; }
.form-options select, .form-options input[type="date"] { max-width: 125px; height: 33px; padding: 0 7px; border: 1px solid #edf0ee; border-radius: 6px; outline: 0; background: #fff; color: #78837d; font-size: 9px; }
.form-options input[type="date"] { width: 113px; }
.form-options select:focus, .form-options input:focus, .sort-select select:focus { border-color: #9dc5ad; }
.add-button { display: inline-flex; height: 34px; align-items: center; justify-content: center; gap: 8px; padding: 0 12px; border: 0; border-radius: 7px; background: #347d66; color: white; font-size: 10px; font-weight: 600; white-space: nowrap; transition: background .16s ease, transform .16s ease; }
.add-button:hover { transform: translateY(-1px); background: #28664f; }
.toolbar { display: flex; align-items: center; gap: 10px; margin: 17px 0 10px; }
.filter-tabs { display: flex; gap: 2px; padding: 3px; border: 1px solid #e9eeeb; border-radius: 8px; background: #fff; }
.filter-tab { padding: 7px 11px; border: 0; border-radius: 5px; background: transparent; color: #89938e; font-size: 10px; }
.filter-tab.is-selected { background: #edf5f0; color: #38745c; font-weight: 700; }
.search-box { display: flex; height: 34px; flex: 1; align-items: center; gap: 7px; padding: 0 9px; border: 1px solid #e9eeeb; border-radius: 7px; background: #fff; color: #9aa49f; }
.search-box > span { font-size: 19px; line-height: 1; }
.search-box input { width: 100%; min-width: 0; padding: 0; border: 0; outline: 0; color: #4a554f; font-size: 10px; }
kbd { padding: 2px 5px; border: 1px solid #e8ece9; border-radius: 4px; color: #a5ada9; font: 9px "DM Sans", sans-serif; }
.sort-select select { height: 34px; padding: 0 25px 0 9px; border: 1px solid #e9eeeb; border-radius: 7px; outline: 0; background: #fff; color: #78837d; font-size: 10px; }

.task-list { display: grid; gap: 8px; }
.task-card { display: flex; min-height: 65px; align-items: center; gap: 12px; padding: 11px 13px; border: 1px solid #e9eeeb; border-radius: 9px; background: #fff; transition: border-color .16s ease, box-shadow .16s ease; }
.task-card:hover { border-color: #d8e5dc; box-shadow: 0 4px 12px rgba(40,70,50,.035); }
.task-checkbox { position: relative; width: 18px; height: 18px; flex: 0 0 auto; margin: 0; appearance: none; border: 1.5px solid #cbd5cf; border-radius: 6px; cursor: pointer; transition: all .16s ease; }
.task-checkbox:checked { border-color: #49866b; background: #49866b; }
.task-checkbox:checked::after { position: absolute; top: 1px; left: 5px; width: 4px; height: 8px; transform: rotate(45deg); border: solid #fff; border-width: 0 1.5px 1.5px 0; content: ""; }
.task-checkbox:focus-visible { outline: 3px solid #c8e1d1; outline-offset: 2px; }
.task-main { min-width: 0; flex: 1; }
.task-title { overflow-wrap: anywhere; margin: 0; color: #3d4842; font-size: 11px; font-weight: 600; }
.task-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; margin-top: 6px; }
.task-category, .priority-badge, .due-badge { display: inline-flex; align-items: center; min-height: 19px; padding: 0 7px; border-radius: 5px; font-size: 9px; font-weight: 500; }
.task-category { background: #f3f5f4; color: #78827d; }
.priority-badge { gap: 4px; }
.priority-badge::before { width: 5px; height: 5px; border-radius: 50%; background: currentColor; content: ""; }
.priority-low { background: #eff5f0; color: #558368; }
.priority-medium { background: #fbf4e8; color: #b58b42; }
.priority-high { background: #fbefed; color: #c26e62; }
.due-badge { background: #f2f4f3; color: #77827c; }
.due-badge.is-overdue { background: #fbefed; color: #bd655b; }
.task-card.is-completed .task-title { color: #a1aaa5; text-decoration: line-through; }
.task-card.is-completed .task-category, .task-card.is-completed .priority-badge { opacity: .65; }
.task-actions { display: flex; gap: 3px; opacity: 0; transition: opacity .16s ease; }
.task-card:hover .task-actions, .task-card:focus-within .task-actions { opacity: 1; }
.icon-button { display: grid; width: 30px; height: 30px; place-items: center; border: 0; border-radius: 6px; background: transparent; color: #929d97; font-size: 15px; }
.icon-button:hover { background: #f2f5f3; color: #3b7358; }
.icon-button.delete-task:hover { background: #fcf0ee; color: #bb665c; }
.empty-state { padding: 42px 12px 35px; text-align: center; }
.empty-illustration { display: inline-grid; width: 46px; height: 46px; place-items: center; margin-bottom: 13px; border-radius: 15px; background: #eaf3ed; color: #578b6e; font-size: 22px; }
.empty-state h3 { margin-bottom: 6px; color: #455149; font: 700 14px "Manrope", sans-serif; }
.empty-state p { margin: 0; color: #929d97; font-size: 11px; }
.page-footer { display: flex; justify-content: space-between; margin-top: 31px; padding-top: 13px; border-top: 1px solid #e8edeb; color: #a1aaa5; font-size: 9px; }
.page-footer span:last-child { color: #7da58b; }

.edit-dialog { width: min(430px, calc(100% - 32px)); padding: 24px; border: 1px solid #e7ece8; border-radius: 14px; background: #fff; box-shadow: 0 20px 70px rgba(26,43,33,.2); }
.edit-dialog::backdrop { background: rgba(27,38,32,.34); backdrop-filter: blur(2px); }
.edit-dialog form { display: grid; gap: 10px; }
.dialog-heading { display: flex; align-items: start; justify-content: space-between; margin-bottom: 6px; }
.dialog-heading h2 { font-size: 20px; }
.dialog-heading .eyebrow { margin-bottom: 4px; }
.dialog-close { width: 27px; height: 27px; font-size: 22px; }
.edit-dialog label { color: #5d6862; font-size: 10px; font-weight: 600; }
.edit-dialog input, .edit-dialog select { width: 100%; height: 38px; padding: 0 10px; border: 1px solid #e3e9e5; border-radius: 7px; outline: 0; background: #fff; color: #3e4a43; font-size: 11px; }
.edit-dialog input:focus, .edit-dialog select:focus { border-color: #95bea4; }
.dialog-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.dialog-fields > div { display: grid; gap: 8px; }
.optional-label { color: #a0aaa4; font-weight: 400; }
.dialog-actions { display: flex; justify-content: end; gap: 8px; margin-top: 10px; }
.cancel-button { height: 34px; padding: 0 13px; border: 1px solid #e4e9e6; border-radius: 7px; background: #fff; color: #6f7a73; font-size: 10px; }
.cancel-button:hover { background: #f7f9f7; }
.toast { position: fixed; z-index: 5; right: 22px; bottom: 20px; padding: 11px 15px; transform: translateY(12px); border-radius: 8px; background: #293b32; color: #fff; box-shadow: 0 8px 25px rgba(24,43,32,.2); font-size: 11px; opacity: 0; pointer-events: none; transition: opacity .2s ease, transform .2s ease; }
.toast.is-visible { transform: translateY(0); opacity: 1; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

@media (max-width: 1000px) {
  .sidebar { width: 215px; }
  .main-content { margin-left: 215px; }
  .topbar { padding: 0 32px; }
  .content-wrap { width: min(100% - 64px, 900px); }
  .overview-note { display: none; }
  .form-options { gap: 5px; }
  .form-options select { max-width: 105px; }
}
@media (max-width: 760px) {
  .sidebar { position: static; width: 100%; height: auto; padding: 13px 18px; border-right: 0; border-bottom: 1px solid var(--line); }
  .brand { margin: 0 0 12px 2px; font-size: 18px; }
  .brand-mark { width: 28px; height: 28px; font-size: 19px; }
  .sidebar-label, .category-list, .sidebar-bottom { display: none; }
  .nav-list { display: flex; gap: 4px; overflow-x: auto; }
  .nav-item { min-height: 35px; flex: 0 0 auto; gap: 7px; padding: 0 10px; font-size: 11px; }
  .nav-count { margin-left: 2px; }
  .main-content { margin-left: 0; }
  .topbar { height: 49px; padding: 0 20px; }
  .content-wrap { width: min(100% - 40px, 600px); padding-top: 27px; }
  .overview-card { min-height: 78px; gap: 9px; padding: 11px; }
  .overview-icon { width: 32px; height: 32px; }
  .overview-card strong { font-size: 17px; }
  .overview-card p { font-size: 9px; }
  .add-task-form { flex-wrap: wrap; padding: 9px; }
  .add-task-form > input[type="text"] { flex-basis: calc(100% - 42px); }
  .form-options { width: 100%; flex-wrap: wrap; padding-left: 35px; }
  .form-options select { flex: 1; max-width: none; }
  .form-options input[type="date"] { flex: 1; width: auto; }
  .form-options .add-button { margin-left: auto; }
  .toolbar { flex-wrap: wrap; }
  .search-box { min-width: 150px; }
}
@media (max-width: 480px) {
  .today-label { display: none; }
  .content-wrap { width: calc(100% - 30px); padding-top: 23px; }
  .welcome-row { margin-bottom: 20px; }
  .date-stamp { width: 52px; height: 58px; }
  .overview-grid { gap: 7px; }
  .overview-card { flex-direction: column; align-items: start; gap: 5px; min-height: 98px; }
  .overview-icon { width: 28px; height: 28px; border-radius: 8px; font-size: 14px; }
  .overview-card p { margin-bottom: 0; }
  .overview-card strong { font-size: 16px; }
  .progress-copy > div { display: grid; gap: 3px; }
  .section-heading { align-items: center; }
  .toolbar { gap: 7px; }
  .filter-tabs { order: 0; }
  .sort-select { margin-left: auto; }
  .search-box { order: 1; flex-basis: 100%; }
  .task-card { gap: 9px; padding: 10px; }
  .task-actions { opacity: 1; }
  .icon-button { width: 27px; height: 27px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
```
app.js
```
"use strict";

const STORAGE_KEY = "daylight-tasks-v1";
const categories = ["Personal", "Work", "Study", "Other"];
const priorities = { low: 1, medium: 2, high: 3 };
let tasks = loadTasks();
let activeView = "all";
let activeCategory = "";
let activeStatus = "all";
let editingTaskId = null;
let toastTimer;

const elements = {
  taskForm: document.querySelector("#task-form"),
  taskInput: document.querySelector("#task-input"),
  categoryInput: document.querySelector("#task-category"),
  priorityInput: document.querySelector("#task-priority"),
  dueInput: document.querySelector("#task-due"),
  taskList: document.querySelector("#task-list"),
  emptyState: document.querySelector("#empty-state"),
  emptyTitle: document.querySelector("#empty-title"),
  emptyCopy: document.querySelector("#empty-copy"),
  search: document.querySelector("#search-input"),
  sort: document.querySelector("#sort-select"),
  clearCompleted: document.querySelector("#clear-completed"),
  editDialog: document.querySelector("#edit-dialog"),
  editForm: document.querySelector("#edit-form"),
  toast: document.querySelector("#toast"),
};

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error("Saved task data is not a list.");
    return parsed.filter((task) =>
      task &&
      typeof task.id === "string" &&
      typeof task.title === "string" &&
      typeof task.completed === "boolean" &&
      categories.includes(task.category) &&
      Object.hasOwn(priorities, task.priority)
    );
  } catch (error) {
    console.error("Could not load saved tasks.", error);
    window.setTimeout(() => showToast("Saved tasks could not be loaded."), 0);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Could not save tasks.", error);
    showToast("Changes could not be saved in this browser.");
    return false;
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2800);
}

function dateAtLocalMidnight(value = new Date()) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDueDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  if (value === dateString(new Date())) return "Today";
  const tomorrow = dateAtLocalMidnight();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (value === dateString(tomorrow)) return "Tomorrow";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}

function initDates() {
  const now = new Date();
  document.querySelector("#header-date").textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "short", month: "short", day: "numeric",
  }).format(now);
  document.querySelector("#date-day").textContent = now.getDate();
  document.querySelector("#date-month").textContent = new Intl.DateTimeFormat(undefined, { month: "short" }).format(now);
  document.querySelector("#greeting").textContent = `A FRESH START · ${new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(now).toUpperCase()}`;
  elements.dueInput.min = dateString(now);
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createTaskCard(task) {
  const card = makeElement("article", `task-card${task.completed ? " is-completed" : ""}`);
  const checkbox = makeElement("input", "task-checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `${task.completed ? "Mark incomplete" : "Complete"}: ${task.title}`);
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const main = makeElement("div", "task-main");
  const title = makeElement("p", "task-title", task.title);
  const meta = makeElement("div", "task-meta");
  meta.append(makeElement("span", "task-category", task.category));
  meta.append(makeElement("span", `priority-badge priority-${task.priority}`, `${task.priority[0].toUpperCase()}${task.priority.slice(1)} priority`));
  if (task.dueDate) {
    const overdue = !task.completed && task.dueDate < dateString(new Date());
    meta.append(makeElement("span", `due-badge${overdue ? " is-overdue" : ""}`, `${overdue ? "Overdue · " : ""}${formatDueDate(task.dueDate)}`));
  }
  main.append(title, meta);

  const actions = makeElement("div", "task-actions");
  const editButton = makeElement("button", "icon-button", "✎");
  editButton.type = "button";
  editButton.setAttribute("aria-label", `Edit ${task.title}`);
  editButton.addEventListener("click", () => openEditDialog(task));
  const deleteButton = makeElement("button", "icon-button delete-task", "×");
  deleteButton.type = "button";
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
  deleteButton.addEventListener("click", () => deleteTask(task.id));
  actions.append(editButton, deleteButton);
  card.append(checkbox, main, actions);
  return card;
}

function matchesView(task) {
  const today = dateString(new Date());
  if (activeView === "today") return !task.completed && task.dueDate === today;
  if (activeView === "upcoming") return !task.completed && task.dueDate && task.dueDate > today;
  if (activeView === "completed") return task.completed;
  return true;
}

function getVisibleTasks() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  const filtered = tasks.filter((task) => {
    if (!matchesView(task)) return false;
    if (activeCategory && task.category !== activeCategory) return false;
    if (activeStatus === "active" && task.completed) return false;
    if (activeStatus === "completed" && !task.completed) return false;
    return !query || task.title.toLocaleLowerCase().includes(query) || task.category.toLocaleLowerCase().includes(query);
  });
  const sortBy = elements.sort.value;
  return filtered.sort((a, b) => {
    if (sortBy === "due") return (a.dueDate || "9999-12-31").localeCompare(b.dueDate || "9999-12-31");
    if (sortBy === "priority") return priorities[b.priority] - priorities[a.priority];
    if (sortBy === "alpha") return a.title.localeCompare(b.title);
    return b.createdAt - a.createdAt;
  });
}

function render() {
  const visibleTasks = getVisibleTasks();
  elements.taskList.replaceChildren(...visibleTasks.map(createTaskCard));
  elements.emptyState.hidden = visibleTasks.length > 0;
  elements.taskList.hidden = visibleTasks.length === 0;
  document.querySelector("#visible-count").textContent = visibleTasks.length;
  document.querySelector("#stat-total").textContent = tasks.length;
  document.querySelector("#stat-completed").textContent = tasks.filter((task) => task.completed).length;
  document.querySelector("#stat-active").textContent = tasks.filter((task) => !task.completed).length;
  document.querySelector("#all-count").textContent = tasks.filter((task) => !task.completed).length;
  document.querySelector("#today-count").textContent = tasks.filter((task) => !task.completed && task.dueDate === dateString(new Date())).length;

  const completed = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  document.querySelector("#progress-percent").textContent = `${progress}%`;
  document.querySelector("#progress-fill").style.width = `${progress}%`;
  document.querySelector("#progress-label").textContent = tasks.length
    ? progress === 100 ? "Everything is checked off — amazing!" : `${completed} of ${tasks.length} tasks completed`
    : "A good time to get started";
  elements.clearCompleted.hidden = completed === 0;
  elements.emptyTitle.textContent = elements.search.value.trim() ? "No tasks match your search" : "Nothing on your list yet";
  elements.emptyCopy.textContent = elements.search.value.trim()
    ? "Try another search or switch to a different view."
    : "Add a task above and make today count.";
}

function commitChange(message) {
  const saved = saveTasks();
  render();
  if (message && saved) showToast(message);
}

function addTask(event) {
  event.preventDefault();
  const title = elements.taskInput.value.trim();
  if (!title) {
    elements.taskInput.focus();
    return;
  }
  tasks.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    category: elements.categoryInput.value,
    priority: elements.priorityInput.value,
    dueDate: elements.dueInput.value,
    completed: false,
    createdAt: Date.now(),
  });
  elements.taskForm.reset();
  elements.priorityInput.value = "medium";
  commitChange("Task added");
  elements.taskInput.focus();
}

function toggleTask(id) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;
  task.completed = !task.completed;
  commitChange(task.completed ? "Task completed" : "Task marked as to do");
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  commitChange("Task deleted");
}

function clearCompleted() {
  const completed = tasks.filter((task) => task.completed).length;
  if (!completed) return;
  tasks = tasks.filter((task) => !task.completed);
  commitChange(`${completed} completed ${completed === 1 ? "task" : "tasks"} cleared`);
}

function openEditDialog(task) {
  editingTaskId = task.id;
  elements.editForm.elements.title.value = task.title;
  elements.editForm.elements.category.value = task.category;
  elements.editForm.elements.priority.value = task.priority;
  elements.editForm.elements.dueDate.value = task.dueDate || "";
  elements.editDialog.showModal();
  elements.editForm.elements.title.focus();
}

function saveEdit(event) {
  event.preventDefault();
  const task = tasks.find((item) => item.id === editingTaskId);
  if (!task) return;
  task.title = elements.editForm.elements.title.value.trim();
  task.category = elements.editForm.elements.category.value;
  task.priority = elements.editForm.elements.priority.value;
  task.dueDate = elements.editForm.elements.dueDate.value;
  elements.editDialog.close();
  commitChange("Task updated");
}

function setView(view, category = "") {
  activeView = view;
  activeCategory = category;
  document.querySelectorAll(".nav-item[data-filter]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.filter === view && !category);
  });
  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.category === category);
  });
  const viewName = category || ({
    all: "All tasks", today: "Today", upcoming: "Upcoming", completed: "Completed",
  }[view] || "All tasks");
  document.querySelector("#view-name").textContent = viewName;
  const titleParts = category
    ? [`${category} `, "tasks."]
    : view === "upcoming" ? ["Coming ", "up."]
      : view === "completed" ? ["Look what ", "you did."]
        : ["Your day, ", "your pace."];
  const pageTitle = document.querySelector("#page-title");
  pageTitle.replaceChildren(document.createTextNode(titleParts[0]), makeElement("span", "", titleParts[1]));
  document.querySelector("#task-heading").firstChild.textContent = category ? `${category} tasks ` : `${view === "today" ? "Today's" : view === "upcoming" ? "Upcoming" : view === "completed" ? "Completed" : "Tasks"} `;
  render();
}

elements.taskForm.addEventListener("submit", addTask);
elements.search.addEventListener("input", render);
elements.sort.addEventListener("change", render);
elements.clearCompleted.addEventListener("click", clearCompleted);
elements.editForm.addEventListener("submit", saveEdit);
document.querySelector("#cancel-edit").addEventListener("click", () => elements.editDialog.close());
document.querySelector(".dialog-close").addEventListener("click", () => elements.editDialog.close());
elements.editDialog.addEventListener("close", () => { editingTaskId = null; });

document.querySelectorAll(".nav-item[data-filter]").forEach((item) => {
  item.addEventListener("click", () => {
    activeStatus = "all";
    document.querySelectorAll(".filter-tab").forEach((tab) => tab.classList.toggle("is-selected", tab.dataset.status === "all"));
    setView(item.dataset.filter);
  });
});
document.querySelectorAll(".category-item").forEach((item) => {
  item.addEventListener("click", () => {
    activeStatus = "all";
    document.querySelectorAll(".filter-tab").forEach((tab) => tab.classList.toggle("is-selected", tab.dataset.status === "all"));
    setView("all", item.dataset.category);
  });
});
document.querySelectorAll(".filter-tab").forEach((item) => {
  item.addEventListener("click", () => {
    activeStatus = item.dataset.status;
    document.querySelectorAll(".filter-tab").forEach((tab) => tab.classList.toggle("is-selected", tab === item));
    render();
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !elements.editDialog.open && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    elements.search.focus();
  }
});

initDates();
render();
```

OUTPUT : 
![alt text](<Screenshot 2026-11-17 133325.png>)

RESULT : 
The program for creating To-do list using JavaScript is executed successfully.