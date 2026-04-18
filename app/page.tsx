export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { RetroWindow } from "@/components/RetroWindow";
import { ListItem } from "@/components/ListItem";
import { SuggestionForm } from "@/components/SuggestionForm";
import { SuggestionsList } from "@/components/SuggestionsList";
import { CountdownTimer } from "@/components/CountdownTimer";

const HARDCODED_ITEMS = [
  "Otoparkta doğrudan en alta inmek",
  "Fazla navigasyon kullanmak",
  "Kemerin içine tshirt sokmak",
  "Aşırı giyim markası bilmek",
  "Arabaya yağ koymayı bilmemek",
  "Koşarken/bisiklet sürerken tayt giymek",
  "Aynayı azıcık kapatınca triplenmek",
  "Ayağı topa değmemiş olmak",
  "Çok fazla antimilitarist olmak",
  "Askere gidip silaha el sürmemek",
  "Manuel ehliyeti olmamak",
  "Crop tshirt giymek",
  "Sadece atlet giymek",
  "Çok ara renk bilmek",
  "Soğuk su içmemek",
  "Evden çok temkinli çıkmak",
  "Tshirtü şortun içine sokmak",
  "Sanatsal bir tabloyu arka planın yapıp bunu sonuna kadar övmek",
  "Eylül ayında mekanda şal almak",
  "Etin yağını yememek",
  "Milli maç varken koşuya çıkmak",
  "Takım sorulunca milli takım diye cevap vermek",
  "R yapar uslanır diye şiir okumak",
  "Şarkı sözlerini ezbere bilmek",
  "Sakatat yememek",
  "Alkol kalorili diye içmemek, diyette olduğu için içmemek",
  "Doğum gününde agalarla rakıya gitmek yerine sevgilisiyle baş başa olmak",
  "Rakı iç(e)memek",
  "El çantası/fannypack taşımak",
  "Meyveli soda tercih etmek",
  "Kafeinsiz kahve içmek",
  "Laktoz toleransı geliştirememek (bkz. skill issue), latte içmek",
  "Herhangi bir ekslüsif (örn. vejeteryan) ekstrem diyet yapmak",
  "Acı yememek",
  "Sakalı 25 yaşında tamamlayamamış olmak",
  "Ateş/patlama sevmemek (bkz. patlayıcı silahlar, motor)",
  "Lazer yaptırmak, ekstra puan için bunun zamanlamasını askerden önceye ayarlamak",
  "Maniküre gitmek",
  "Göğüs kılı olmamak (soyboy)",
  "Fazla su (1L+/gün) içmek, ekstra puan için su içme uygulaması indirmiş olmak",
  "Cadılar bayramı sezonunu ekimin başından/ortasından açmak, herhangi bir batı kültürü bayramını kutlamak",
  "Alkolde sarhoş olmaktan başka bir meziyet görmek (örnek, şarap gurmeleri, IPA bira)",
  "Trafik tabelalarına fazla riayet etmek",
  "Türk kahvesini şekerli içmek",
  "Yaşayan bir insanın fanatiği olmak",
  "Kumar oynamaya korkmak",
  "Duş jeli kullanmak",
  "Hızlı sıçmak, tuvalette keyif yapamamak, hayattan zevk al(a)mamak (sigara, kahve, bok holy trinity)",
  "İki erkek öpüşmek",
  "30 yaşında annenle yaşamak",
  "Uzun süre bir şey düşünmek/planlamak",
  "Vergi vermek",
  "Cila yapmamak",
  "Cigaradan bi fırt alıp patates olup uyumay gitmek",
  "Kredi kartı kullanmak (nakit taşımamak)",
  "Roze tüketmiş olmak",
  "Burun estetiği yaptırmak, ve ekstra puan için solunum problemleri/deviasyon bahanesi atmak",
  "Evcil köpekten korkmak, ekstra puan için şivava",
  "Arabayı kendisine park ettirmek",
];

export default async function Home() {
  const promotedItems = await prisma.listItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-4">
        <RetroWindow title="Gay listesi">
          <div className="text-center space-y-3">
            <h1 className="font-retro text-sm mb-2">GAY LİSTESİ</h1>
            <p className="text-xs leading-relaxed">
              Gay olduğunu şüphelendiğiniz arkadışınızı değerlendirmek için bir liste.
            </p>
            <CountdownTimer />
          </div>
        </RetroWindow>

        <RetroWindow title="Kanon liste">
          <div className="win95-inset bg-white p-2 max-h-[400px] overflow-y-auto">
            {HARDCODED_ITEMS.map((item, index) => (
              <ListItem key={index} text={item} index={index + 1} />
            ))}
            {promotedItems.map((item) => (
              <ListItem key={item.id} text={item.text} index={item.sortOrder} />
            ))}
          </div>
        </RetroWindow>

        <RetroWindow title="Komünite Önerileri">
          <SuggestionsList />
        </RetroWindow>

        <RetroWindow title="Liste itemi öner">
          <SuggestionForm />
        </RetroWindow>
      </div>
    </div>
  );
}
