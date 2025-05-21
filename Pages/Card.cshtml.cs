using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.RegularExpressions;

namespace SweetTogether.Pages
{
    public class CardModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        public string Name1 { get; set; }

        [BindProperty(SupportsGet = true)]
        public string Name2 { get; set; }

        [BindProperty(SupportsGet = true)]
        public string DateText { get; set; }

        [BindProperty(SupportsGet = true)]
        public string Fact { get; set; }
        public bool HasFact { get; set; }

        [BindProperty(SupportsGet = true)]
        public string Mascot { get; set; }

        [BindProperty(SupportsGet = true)]
        public string Color { get; set; } = "#fef3f3"; // ���� �� ���������
        public string MascotPhrase { get; set; }

        [BindProperty(SupportsGet = true)]
        public string Lang { get; set; } = "en"; // �� ��������� ����������
        public string TranslatedFact { get; set; }
        public string ButtonText { get; set; }
        public void OnGet()
        {
            var phrases = new Dictionary<string, string>
    {
        { "stars", "shining" },
        { "birds", "flying" },
        { "bunnybear", "hugging" },
        { "cats", "purring" },
        { "clouds", "dreaming" },
        { "bees", "buzzing" },
        { "music", "vibing" },
        { "gamepads", "playing" }
    };

            MascotPhrase = phrases.TryGetValue(Mascot?.ToLower() ?? "", out var value) ? value : "together";

            if (string.IsNullOrWhiteSpace(Color) || !Regex.IsMatch(Color, "^#(?:[0-9a-fA-F]{3}){1,2}$"))
            {
                Color = "#fef3f3";
            }

            var phrasesEn = new Dictionary<string, string>
    {
        { "stars", "We've been shining together" },
        { "birds", "We've been flying together" },
        { "bunnybear", "We've been hugging together" },
        { "cats", "We've been purring together" },
        { "clouds", "We've been dreaming together" },
        { "bees", "We've been buzzing together" },
        { "music", "We've been vibing together" },
        { "gamepads", "We've been playing together" }
    };

            var phrasesRu = new Dictionary<string, string>
    {
        { "stars", "�� ����� ������" },
        { "birds", "�� ������ ������" },
        { "bunnybear", "�� ���������� ������" },
        { "cats", "�� �������� ������" },
        { "clouds", "�� ������� ������" },
        { "bees", "�� ������ ������" },
        { "music", "�� ������ ������" },
        { "gamepads", "�� ������ ������" }
    };

            var buttonTexts = new Dictionary<string, string>
    {
        { "en", "Create your own card!" },
        { "ru", "������� ���� ��������!" }
    };

            var mascotKey = Mascot?.ToLower() ?? "stars";

            MascotPhrase = Lang == "ru" ? phrasesRu.GetValueOrDefault(mascotKey, "") : phrasesEn.GetValueOrDefault(mascotKey, "");
            TranslatedFact = Lang == "ru" ? TranslateFactToRussian(Fact) : Fact;
            HasFact = !string.IsNullOrWhiteSpace(TranslatedFact);
            ButtonText = buttonTexts.GetValueOrDefault(Lang, "Create your own card!");
        }

        private string TranslateFactToRussian(string fact)
        {
            if (string.IsNullOrWhiteSpace(fact)) return "";

            var translations = new Dictionary<string, string>
    {
        { "We've hugged more than", "�� �������� ����� ���" },
        { "Our cuddle time adds up to", "���� ����� ������� ���������" },
        { "We've kissed over", "�� ������������ �����" },
        { "We've held hands for", "�� ��������� �� ���� � �������" },
        { "We've met eyes more than", "�� ����������� ��������� �����" },
        { "We've laughed together for", "�� �������� ������ � �������" },
        { "Our love has lasted", "���� ������ ������ ���" },
        { "We've sent each other over", "�� ��������� ���� ����� �����" },
        { "We've made more than", "�� ������� �����" },
        { "We've said \"I love you\" over", "�� ������� ������� �����" },
        { "times", "���" },
        { "in total", "�����" },
        { "seconds", "������" },
        { "minute", "������" },
        { "minutes", "�����" },
        { "hour", "���" },
        { "hours", "�����" }
    };

            foreach (var pair in translations)
            {
                fact = fact.Replace(pair.Key, pair.Value);
            }

            return fact;
        }

    }
}
