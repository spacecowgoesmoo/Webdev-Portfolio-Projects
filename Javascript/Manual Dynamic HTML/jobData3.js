var job3 = {
	"headline": "HTML5 Game Developer",
	"essentials": {
		"locations": "Brisbane",
        "employment": EmploymentType().Temporary,
        "experience": [ExperienceLevels().Seasoned, ExperienceLevels().Lead],
		"startdate": (new Date()).getTime(),
		"teamsize": { "min": 5, "max": 10 },
	},
	"methodology": {
		"prototyping": true,
		"failfast": false,
		"version control": VersionControlSystem().NotYetChosen,
		"issue tracker": IssueTrackers().GitHub,
		"standups": false,
		"quickstart": true,
	},
	"specs": {
		"workload": 1.2,
        "PTO": PTO().Unlimited
	},
	"profile": {
		"client support": 0,
		"documentation": 5,
	},
	"equipment": {
		"operating system": [OperationSystems().Windows, OperationSystems().MacOSX],
		"computer": MachineType().Workstation,
	},
	"technologies": {
        "javascript": Level().Good,
        "node": Level().Familiar,
        "rest": Level().Expert,
        "design": Level().Familiar,
        "framework": {
            "oneof": {
                "vue": Level().Expert,
                "angular": Level().Familiar,
            }
        },
    },
	"other": [
        "Esports experience a plus",
        "Interest in 3D animation or gaming",
		"Please include PDF resume and cover letter"
	]
}

function EmploymentType() { return enumerate("Permanent", "Temporary", "Project"); }
function ExperienceLevels() { return enumerate("Junior", "Seasoned", "Lead", "GrayBeard"); }
function CompanySize() { return enumerate("LessThanTen", "TenToTwenty", "TwentyToFifty", "FiftyToTwoHundred", "MoreThanTwoHundred"); }
function VersionControlSystem() { return enumerate("NotYetChosen", "Git", "BitBucket"); }
function IssueTrackers() { return enumerate("NotYetChosen", "GitHub", "Jira", "Tikkit"); }
function BuildServers() { return enumerate("NotYetChosen", "Jenkins", "Travis", "Codeship", "CircleCI"); }
function CodeAnalysisTools() { return enumerate("NotYetChosen", "ESLint"); }
function KnowledgeRepos() { return enumerate("NotYetChosen", "GitHubWiki", "Confluence"); }
function TravelOptions() { return enumerate("None", "Possible", "Plentiful"); }
function ScheduleOptions() { return enumerate("Fixed", "Flexible"); }
function RemoteWorking() { return enumerate("No", "Negotiable", "Required"); }
function RelocationPackages() { return enumerate("Nonealse", "Negotiable"); }
function OperationSystems() { return enumerate("MacOSX", "CentOS", "Ubuntu", "Windows"); }
function MachineType() { return enumerate("Workstation", "Laptop"); }
function Monitors() { return enumerate("Negotiable"); }
function Level() { return enumerate("Familiar", "Good", "Expert"); }
function TrainingType() { return enumerate("None", "Informal", "Formal", "External"); }
function PTO() { return enumerate("Accrued", "Unlimited") }