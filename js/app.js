angular.module('RinoplastieApp', [ 'Rinoplastie.controllers', 'ngRoute', 'pascalprecht.translate', 'ngSanitize' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when("/home", {
				templateUrl : "partials/home.html",
				controller : ""
			}).when("/about", {
				templateUrl : "partials/about.html",
				controller : ""
			}).when("/services", {
				templateUrl : "partials/services.html",
				controller : ""
			}).when("/contact", {
				templateUrl : "partials/contact.html",
				controller : ""
			}).when("/incovoiat", {
				templateUrl : "partials/tip_nas/nasIncovoiat.php",
				controller : ""
			}).when("/gogol", {
				templateUrl : "partials/tip_nas/nasGogol.php",
				controller : ""
			}).when("/posttraumatic", {
				templateUrl : "partials/tip_nas/nasPosttraumatic.php",
				controller : ""
			}).when("/reoperat", {
				templateUrl : "partials/tip_nas/nasReoperat.php",
				controller : ""
			}).when("/indicatii", {
				templateUrl : "partials/indicatiiGenerale.html",
				controller : ""
			}).when("/interviuri", {
				templateUrl : "partials/interviuriTv.html",
				controller : ""
			}).when("/articol1", {
				templateUrl : "partials/articole/tratamentulMigreneiCuBotox.html",
				controller : ""
			}).when("/articol2", {
				templateUrl : "partials/articole/mezobotox.html",
				controller : ""
			}).when("/articol3", {
				templateUrl : "partials/articole/cercei.html",
				controller : ""
			}).when("/articol4", {
				templateUrl : "partials/articole/implanturileMamare.html",
				controller : ""
			}).when("/articol5", {
				templateUrl : "partials/articole/terapiaDePranz.html",
				controller : ""
			}).when("/articol6", {
				templateUrl : "partials/articole/studiu.html",
				controller : ""
			}).when("/articol7", {
				templateUrl : "partials/articole/ulcerGamba.html",
				controller : ""
			}).when("/articol8", {
				templateUrl : "partials/articole/articolGogol.html",
				controller : ""
			}).when("/articol9", {
				templateUrl : "partials/articole/sculptra.html",
				controller : ""
			}).when("/articol10", {
				templateUrl : "partials/articole/sforaitul.html",
				controller : ""
			}).when("/articol11", {
				templateUrl : "partials/articole/botox.html",
				controller : ""
			}).when("/articol12", {
				templateUrl : "partials/articole/riduri.html",
				controller : ""
			}).when("/diverse", {
				templateUrl : "partials/diverse.html",
				controller : ""
			}).when("/interventie1", {
				templateUrl : "partials/interventii/interventie1.php",
				controller : ""
			}).when("/interventie2", {
				templateUrl : "partials/interventii/interventie2.php",
				controller : ""
			}).when("/interventie3", {
				templateUrl : "partials/interventii/interventie3.php",
				controller : ""
			}).when("/interventie4", {
				templateUrl : "partials/interventii/interventie4.php",
				controller : ""
			}).when("/interventie5", {
				templateUrl : "partials/interventii/interventie5.php",
				controller : ""
			}).when("/interventie6", {
				templateUrl : "partials/interventii/interventie6.php",
				controller : ""
			}).when("/interventie7", {
				templateUrl : "partials/interventii/interventie7.php",
				controller : ""
			}).when("/interventie8", {
				templateUrl : "partials/interventii/interventie8.php",
				controller : ""
			}).when("/interventie9", {
				templateUrl : "partials/interventii/interventie9.php",
				controller : ""
			}).when("/login", {
				templateUrl : "partials/login.html",
				controller : "loginController"
			}).when("/admin", {
				templateUrl : "partials/admin.html",
				controller : "adminController"
			}).when("/admin/images", {
				templateUrl : "partials/admin_partials/all_photos.html",
				controller : "adminController"
			}).when("/admin/images/banner", {
				templateUrl : "partials/admin_partials/banner.html",
				controller : "adminController"
			}).when("/admin/images/gogol", {
				templateUrl : "partials/admin_partials/gogol.html",
				controller : "adminController"
			}).when("/admin/images/reoperat", {
				templateUrl : "partials/admin_partials/reoperat.html",
				controller : "adminController"
			}).when("/admin/images/posttraumatic", {
				templateUrl : "partials/admin_partials/posttraumatic.html",
				controller : "adminController"
			}).when("/admin/images/incovoiat", {
				templateUrl : "partials/admin_partials/incovoiat.html",
				controller : "adminController"
			}).when("/admin/upload", {
				templateUrl : "partials/admin_partials/upload.html",
				controller : "adminController"
			}).when("/admin/password", {
				templateUrl : "partials/admin_partials/changePass.html",
				controller : "adminController"
			}).when("/misiuni", {
				templateUrl : "partials/interventii/misiuni_umanitare.php"
			}).when("/consultatie", {
				templateUrl : "partials/consultatie.php",
			}).otherwise({
				templateUrl : "partials/home.html"
			});

		} ])

		
.run(function($rootScope, $location, $cookies) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
		if ($rootScope.loggedInUser == null) {
			// no logged user, redirect to /login
			var isUserLoggedIn = !($cookies.get('userName') == null && ($cookies.get('userError') == null || ($cookies.get('userError') != null && $cookies.get('userError') != false)));
			if (next.templateUrl === "partials/login.html" && isUserLoggedIn) {
				$location.path("/admin");
			}
			else if (next.templateUrl === "partials/admin.html"  && !isUserLoggedIn) {
				$location.path("/login");
			}
			else if (next.templateUrl === "partials/admin_partials/all_photos.html"  && !isUserLoggedIn) {
				$location.path("/login");
			}
			else if (next.templateUrl === "partials/admin_partials/changePass.html"  && !isUserLoggedIn) {
				$location.path("/login");
			}
			else if (next.templateUrl === "partials/admin_partials/upload.html"  && !isUserLoggedIn) {
				$location.path("/login");
			}
			else {
				// do nothing
			}
		}
    });
})

.config(function($translateProvider){
	$translateProvider.translations('ro', {
		HOME: 'Acasa',
		SERVICES: 'Servicii',
		CV: 'CV',
		CONTACT: 'Contact',
		GENERAL_ADVICE: 'Indicatii generale',
		MEDIA: 'Media',
		INTERVENTIONS: 'Alte Interventii',
		CROOKED_NOSE: 'Nas Incovoiat',
		GOGOL_NOSE: 'Nasul lui Gogol',
		POSTTRAUMATIC_NOSE: 'Nas Posttraumatic',
		REOPERATED_NOSE: 'Nas Reoperat',
		CROOKED_NOSE_DETAILS: '<p>In general, la acest tip de nas structura este următoarea:</p> <ul>     <li>Unghiul dintre frunte si nas este&nbsp; mic</li>     <li>Oasele nazale sunt prea lungi.</li>     <li>Cartilajele alare superioare sunt inalte. Septul este deviat si inalt.</li>     <li>Domul&nbsp; nazal (varful nasului), de cele mai multe ori, este orientat in jos.</li>     <li>Columela atarna astfel incat se poate vedea, din lateral, partea ei intranarinara cu fire de par.</li> </ul> <p>Schema de reconstrucție este următoarea.</p> <p>Se face incizie la nivelul columelei ( deasupra buzei) si se deschide nasul astfel încat sa avem acces la oasele nazale si cartilaje. Se desfac cartilajele alare superioare pentru a avea acces la septul nazal. Se decoleaza mucoasa de pe ambele parti ale septului. Daca exista disfunctii respiratorii din cauza deviatiei de sept -se scoate partea deviata a septului din care se modeleaza bucati pentru a umple&nbsp; unghiul nazofrontal. Se coase septul.</p> <p>Se reduc in inaltime oasele nazale cu dalta si lovituri usoare de ciocan, cu pile de diferite dimensiuni ale asperitatilor, se fractureaza, cu dalta fina,&nbsp; lateral si superior, oasele nazale si se repozitionează pe linia de mijloc piramida nazala.</p> <p>Se reduc in inaltime septul si cartilajele superioare alare astfel încat dorsul nasului sa devina o linie dreapta la barbati&nbsp; si usor curba la femei. In acest moment operator, chirurgul se asigura ca nu raman denivelari si ca piramida nazala ia o forma armonioasa.</p> <p>Unghiul dintre frunte si nas se&nbsp; corecteaza cu bucati&nbsp; de cartilaj ( grefe) inserate aici sub piele.</p> <p>Varful nasului e ridicat, cat e necesar, cu ajutorul inciziilor și a suturilor specifice.</p> <p>E foarte important sa fie rectificata, in acelasi timp operator, si deviatia de sept.</p>',
		GOGOL_NOSE_DETAILS: '<p>Acest tip de nas reprezinta combinatia dintre nasul lung si cel incovoiat ( hispanic). In acest caz marimea curburii dorsale este mult mai mare si include atat partea osoasa cat si cartilaginoasa.</p> <p>Oasele nazale se reduc in inaltime cu dalta si lovituri usoare de ciocan, cu pile de diferite dimensiuni ale asperitatilor, se fractureaza ,cu dalta fina,&nbsp; lateral si superior si se repozitioneaza pe linia de mijloc piramida nazala.</p> <p>Se reduc in inaltime septul si cartilajele superioare alare astfel încat dorsul nasului sa devina o linie dreapta la barbati&nbsp; si usor curba la femei. In acest moment operator, chirurgul se asigura ca nu raman denivelari si ca piramida nazala ia o forma armonioasa.</p> <p>Unghiul dintre frunte si nas se&nbsp; corecteaza cu bucati&nbsp; de cartilaj ( grefe) inserate aici sub piele.</p> <p>Vârful nasului e ridicat, cat e necesar, cu ajutorul inciziilor si a suturilor specifice.</p> <p>E foarte important sa fie rectificata, in acelasi timp operator, si deviatia de sept.</p>',
		POSTTRAUMATIC_NOSE_DETAILS: '<p> Este important ca deviatia de sept postraumatica sau congenitala sa fie corectata (septoplastia) concomitent cu piramida nazala (rhinoplastia). </p><p> Interventia poate fi facuta in regim de urgenta. E de preferat, deoarece, se pot rearanja oasele si septul, astfel incat sa nu ramana deviate. </p><p> INSA, in&nbsp; aproape toate cazurile, rhinoplastia posttraumatica are loc la mult timp dupa traumatism. </p><p> Pot fi&nbsp; deviate: oasele nazale/ cartilajele/ ambele. </p><p> Corectarea unui nas posttraumatic este posibila DOAR daca se face concomitent si corectia septului deviat dupa traumatism si fracturarea cu repozitionarea oaselor nazale.&nbsp; Septoplastia si rhinoplastia de corectie sunt efectuate, de obicei, de catre chirurgi antrenati in acest domeniu al chirurgiei plastice. </p><p> Reconstructia unui nas postraumatic necesita recoltarea materialului&nbsp; cartilaginos de la nivelul: cartilajului septal,auricular sau costal. </p><p> Alte materiale necesare pentru nivelarea dorsum-ului nazal pot fi: fascia temporala,&nbsp; materiale bilogice ( fascia lata) recoltate si dezinfectate de la cadavru sau&nbsp; plase sintetice. Cel mai indicat este folosirea cartilajului septal al pacientului. Prin urmare, este foarte important ca septul sa NU fi fost operat in alt timp operator in cadrul serviciului ORL . </p><p> E foarte important sa fie rectificata, in acelasi timp operator, si deviatia de sept. </p>',
		REOPERATED_NOSE_DETAILS: '<p>In aceste situatii, complexe din punct de vedere reconstructiv,se va lua in considerare posibilitatea de a recolta cartilaj de lanivelul septului nazal, urechilor sau coastei pentru a dispune dematerial hialin cu care sa fie reconstruite, dupa caz, aripilenazale, varful, partea dorsala cartilaginoasa a piramideinazale.</p><p>Rinoplastia se repeta in cazurile in care la primele operatiis-au efectuat doar modificarile osoase si de varf fara corectiaseptului si a portiunii dorsale a cartilajelor care formeaza corpulpiramidei nazale.</p><p>E foarte important sa fie rectificata, in acelasi timp operator,si deviatia de sept.</p>',
		GENERAL_ADVICE_DETAILS: '<p>Dr. Argentina Vidrascu este chirurg plastician specializat inseptorinoplastie deschisa-80% din interventiile chirurgicaleefectuate sunt&nbsp; pentru corectia nasului.</p><p>Este foarte important ca chirurgia nasului sa includa sitratamentul deviatiei de sept cu pozitionarea piramidei osoase pelinia mediana pentru obtinerea unui rezultat predictibil, stabil,armonios si fara probleme de respiratie.<br> Pacientul care doreste sa beneficieze de corectia estetica anasului ar trebui sa stie ca, deseori, este necesara si a doua sauchiar a treia interventie pentru obtinerea unui rezultat bun. Prinurmare, astfel se explica de ce aceste interventii sunt efectuateanume de catre chirurgul rhinoplastic.</p><p>&nbsp;</p><p><strong>Tot procesul decurge astfel.</strong></p><p>O prima consultatie in cu ocazia careia se examineaza septul,respiratia&nbsp; pe narine, starea piramidei osoase, a cartilajelorsi tegumentului regiunii nazale.&nbsp; Pacienta/pacientul isiexpune EXACT defectele care doreste sa le corecteze si prioritateaacestora deoarece s-ar putea ca nu toate sa poata firemediabile.&nbsp; E important ca pacientul sa fie echilibratpentru a beneficia de rhinoplastie, deoarece aceasta este ointerventie&nbsp; extrem de laborioasa, de mare precizie, dificilde executat si cu un impact mare asupra imaginii . In mod normal,medicul refuza un pacient care are asteptari nepotrivite,&nbsp; nueste motivat, nu stie exact ce schimbare sau ameliorare doreste,este nehotarat sau spera sa rezolve anumite probleme din viatapersonala cu ocazia operatiei.&nbsp; Pe parcursul acesteiintrevederi i se aduc la cunostinta si riscurile, efectele adverse,conduita postoperatorie si perioada de recuperare.</p><p>La consultatia preoperatorie&nbsp; se preiau imaginile foto alepacientului pentru stabilirea exacta a planului operator:modificarile estetice si functionale . Se completeaza diagrama cumodificarile presupuse atat pe sept cat si pe piramida.</p><p>Rhinoplastia deschisa se poate efectua in bune conditii doar cuanestezie generala. Pacientul in dimineata interventiei nu vaconsuma deloc alimente lichide si solide. Interventia dureaza1,5-2,5 h ,&nbsp; cu minima cicatrice- in functie de modificarilenecesare.&nbsp; Uneori, se poate efectua si septorinoplastiainchisa pentru mici retusuri. Postoperator, pacientul ramaneinternat in clinica, sub supravegherea medicului anestezist. Dacaevolutia este favorabila, a doua zi postoperator se extragtampoanele intranazale ( manevra care provoaca disconfort) si seexternează pacientul cu indicatiile postoperatorii, inscrise inbiletul de iesire.<br> Urmatoarea vizita la clinica se stabileste la 5-7 zile, cand se vasuprima atela si pansamentul. Firele se scot la 7 zile pentru alasa minima cicatrice. Vanataile de la nivelul pleoapelor persista7-10 zile, iar inflamatia - câteva luni.<br> Rezultatul final se instaleaza la, aproximativ, un an.</p><p>Complicatii posibile: asimetrii, denivelari ale piramideinazale, deformarea septului sau narinelor cu dificultatirespiratorii, infectie, rhinita vasomotorie. Uneori rezultatulimediat postoperator pare a fi favorabil, dar tegumentul se poateretracta in timp deformand linia cartilajelor nazale. Mai exista sicomplicatiile deloc de neglijat ale oricarei anestezii generaleprintre care chiar si moartea subita. Asfel, rhinoplastia este ointerventie chirurgicala care trebuie efectuata doar in cazuri incare este absolut necesara de catre chirurg rhinoplstic.</p>',
		ONLINE_CONSULTATION: '<p><strong>Consultatie on-line</strong><br/><p><b>Pasul unu:</b> trimiteti imagini foto fata si profile la adresa doctorvidrascu@gmail.com si veti primi un raspuns daca puteti fi ajutat.</p><b>Pasul doi:</b> Programarea telefonica pentru prima consultatie la unul din nr. de telefon:<p>0264 - 353 566</p><p>0743 - 555 476</p><p>0743 - 55 LIPO.</p><p>Programarea din timp va va ajuta sa obtineti, daca doriti, o anumita data.</p>',
		HOME_DETAILS: '<p>Dr. Argentina Vidrascu este chirurg plastician specializat in septorinoplastie deschisa - 80% din interventiile chirurgicale efectuate sunt pentru corectia nasului.</p>',
		GO_TO_SERVICES: 'Oferte servicii',
		SURGERY: 'Interventii chirurgicale',
		ARTICLES: 'Articole',
		HUMANITARIAN_MISSIONS: 'Voluntariat Iordania 2015',
		VAGINAL_RECONSTRUCTION: 'VAGINAL_RECONSTRUCTION',
		VAGINAL_RECONSTRUCTION_DETAILS: 'VAGINAL_RECONSTRUCTION',
		BOTOX_WRINKLE_REDUCTION: 'ATENUARE RIDURI CU BOTOX',
		BOTOX_WRINKLE_REDUCTION_DETAILS: 'ATENUARE RIDURI CU BOTOX',
		HYALURONIC_WRINKLE_REMOVAL: 'ATENUARE RIDURI CU ACID HIALURONIC',
		HYALURONIC_WRINKLE_REMOVAL_DETAILS: 'ATENUARE RIDURI CU ACID HIALURONIC',
		LIP_ENLARGEMENT: 'MARIRE BUZE',
		LIP_ENLARGEMENT_DETAILS: 'MARIRE BUZE',
		CIRCLE_REMOVAL: 'ELIMINARE CEARCANE',
		CIRCLE_REMOVAL_DETAILS: 'ELIMINARE CEARCANE',
		BREAST_IMPLANT: 'IMPLANT MAMAR',
		BREAST_IMPLANT_DETAILS: 'IMPLANT MAMAR',
		LIPOSUCTION: 'LIPOFILLING',
		LIPOSUCTION_DETAILS: 'LIPOFILLING',
		LABIAPLASTY: 'MICSORARE LABII',
		LABIAPLASTY_DETAILS: 'MICSORARE LABII',
		VAGINAL_REJUVENATION: 'REJUVERARE VAGINALA',
		VAGINAL_REJUVENATION_DETAILS: 'REJUVERARE VAGINALA',
		WRINKLES_LUNCH_THERAPY: 'TERAPIA DE PRANZ A RIDURILOR',
		WRINKLES_LUNCH_THERAPY_DETAILS: 'TERAPIA DE PRANZ A RIDURILOR',
		LARGE_MULTICENTER_STUDY_FEMALE_GENITAL_PASTIC_SURGERY: 'Un studiu multicentru referitor la Chirurgia Plastica Genitala Feminina (CPGF)',
		LARGE_MULTICENTER_STUDY_FEMALE_GENITAL_PASTIC_SURGERY_DETAILS: 'Un studiu multicentru referitor la Chirurgia Plastica Genitala Feminina (CPGF)',
		LEG_ULCERS: 'ULCERUL DE GAMBA',
		LEG_ULCERS_DETAILS: 'ULCERUL DE GAMBA',
		DEVIATED_SEPTUM_GOGOL_NOSE: 'Deviatia de sept si "Nasol lui Gogol"',
		DEVIATED_SEPTUM_GOGOL_NOSE_DETAILS: 'Deviatia de sept si "Nasol lui Gogol"',
		SCULPTRA: 'Sculptra',
		SCULPTRA_DETAILS: 'Sculptra',
		SNORING: 'Snoring – Sleep Apnoea',
		SNORING_DETAILS: 'Snoring – Sleep Apnoea',
		BOTOX_MYTHS: 'Myths about Botox',
		BOTOX_MYTHS_DETAILS: 'Myths about Botox',
		FAT_DEPOSITS: 'From money deposits to fat deposits',
		FAT_DEPOSITS_DETAILS: 'From money deposits to fat deposits'
		
	 })
	.translations('en', {
		HOME: 'Home',
		SERVICES: 'Services',
		CV: 'CV',
		CONTACT: 'Contact',
		GENERAL_ADVICE: 'General advice',
		MEDIA: 'Media',
		INTERVENTIONS: 'Other Interventions',
		CROOKED_NOSE: 'Crooked Nose',
		GOGOL_NOSE: 'Gogol\'s Nose',
		POSTTRAUMATIC_NOSE: 'Posttraumatic nose',
		REOPERATED_NOSE: 'Re-operated nose',
		CROOKED_NOSE_DETAILS: '<p>Specific features of the crooked nose:</p><ul><li>Small angle between forehead and nose</li><li>Nasal bones are too long</li><li>Upper lip cartilages are too high. Septum is deviated and toohigh</li><li>Nasal dome is facing down</li><li>Columella (the narrow strip of tissue that separates thenostrils) is hanging</li></ul><p>&nbsp;</p><p>Reconstruction scheme:</p><p>The surgeon makes a small columellar incision (above the lips)in order to gain access to the nasal bones and cartilage. Upper lipcartilages are gently raised, allowing access to the nasal septum.The surgeon separates the nasal lining on the both sides of theseptum. If the patient has respiratory dysfunctions because of theseptum deviation, then it is now straightened, the deviated part ofthe septum is removed and used to mold pieces which will be usedlater on to fill the nasofrontal angle. The underlying structure ofthe nose is sculpted to the desired shape, by applying gentlemovement with the help of a chisel and a hammer in order to reducethe nasal bones height. Then the nasal pyramid is repositioned onthe midline. The height of the superior alar cartilage and theseptum are reduced so that the dorsal nose forms a straight line inthe case of man and easily curved in case of a woman. In this stageof the procedure the surgeon will carefully analyse the line of thenasal pyramid in order to ensure that it is harmoniously shapedwithout any bump. Small pieces of cartilage from the septum areinserted in the space formed by the angle between the forehead andnose, in order to correct it. Nasal skin and tissue is redraped andincisions are closed. The tip of the nose is slightly raised usingspecific incisions and sutures.</p><p>&nbsp;</p><p>Septum deviation should be corrected during the same surgicalprocedure (if applicable).</p>',
		GOGOL_NOSE_DETAILS: '<p>Gogol\'s nose represents the combination between the Hispanic orcrooked nose and the long nose.&nbsp; In this case the size of thedorsal curvature is much larger and includes both the bone and thecartilage.</p><p>&nbsp;The correction means reshaping the nasal bones by reducingthe height with the help of a chisel and a hammer and the nasalpyramid is repositioned on the midline. The height of the superioralar cartilage and the septum are reduced so that the dorsal noseforms a straight line in the case of man and easily curved in caseof a woman. In this stage of the procedure the surgeon willcarefully analyse the line of the nasal pyramid in order to endurethat it is harmoniously shaped without any bump. Small pieces ofcartilage from the septum are inserted space formed by the anglebetween the forehead and nose in order to correct it. Nasal skinand tissue is redraped and incisions are closed. The tip of thenose is slightly raised using specific incisions and sutures.</p><p>&nbsp;Septum deviation should be corrected during the samesurgical procedure (if applicable</p>',
		POSTTRAUMATIC_NOSE_DETAILS: '<p>The posttraumatic or congenital septum deviation (septoplasty)has to be corrected simultaneously with the nasal pyramid(rhinoplasty). The intervention should be done as urgent aspossible, thus enduring a better healing and rearrangement of thebones and the septum. Unfortunately in most of the cases theposttraumatic rhinoplasty is performed long after the traumahappened.</p><p>In this case of posttraumatic nose, both the nasal bones and thecartilages may be diverted.</p><p>The correction of the posttraumatic nose means the simultaneouscorrection and repositioning of septum and the nasal bones alike.Septoplasty and rhinoplasy surgical procedures are performed onlyby professional surgeons trained in this specific field of plasticsurgery.</p><p>The reconstruction of posttraumatic nose requires harvesting theseptum, ear or rib cartilage. Other materials that can be used forthe levelling of the dorsal nose are: temporal fascia, and otherbiological materials harvested and disinfected from a dead body.The most recommended is the usage of the patient\'s septum cartilagein case it was not operated before.</p><p>Septum deviation should be corrected during the same surgicalprocedure (if applicable).</p>',
		REOPERATED_NOSE_DETAILS: '<p>From the reconstructive point of view this is a very complexsituation. Therefore new reconstructive options have to be takeninto account, such as: the possibility to harvesting cartilage fromthe nasal septum, ear of coast which contain hyaline material, thisbeing necessary for the reconstruction of nasal wings, nose tip,dorsal part of the nose and the nasal pyramid.</p><p>Rhinoplasty have to be repeated in cases when during theprevious surgery were made changes only at the level of nasal bonesand nasal tip, without correction of the septum and the dorsalportion of the cartilages that forms the nasal pyramid.</p><p>Septum deviation should be corrected during the same surgicalprocedure (if applicable).</p>',
		GENERAL_ADVICE_DETAILS: '<p>Dr. Argentina Vidrascu is a plastic surgeon specialized in openseptorhinoplasty - 80% of her surgical interventions are focused onnose correction.</p><p>A successful surgical procedure must include the correction ofthe nasal septum deviation in order to achieve predictable, stableand harmonious results. This involves the repositioning of the bonynasal pyramid in the midline. The patient willing to benefit of theaesthetic correction of the nose should be aware that multiplesurgeries (two or three) are often needed in order to obtain a goodoutcome.</p><p>Procedure:</p><p>During the first consultation for rhinoplasty, the surgeon willperform an internal and external examination of the nose, theseptum, breathing through nostrils, the state of the pyramid bone,the cartilage and the region of the nasal skin. The patient willhave the possibility to discuss his/her primary concerns andobjectives and will communicate clearly what aspects he/she wantsto correct and their priority since some of them may not beremedied. This is a laborious intervention, of high precision,difficult to execute and with a high impact on the image of thepatient. Therefore the patient should be well informed and have theright expectations regarding the procedure and the results of thesurgery. Usually doctors prefer to work with patients who have theright expectations, are determined and clear about the correctionthey want to make in what regards the aesthetic of their nose.Aspects of the procedure such as anesthesia, the follow uptreatment and the recovery period, the risks and potentialcomplications, the side effects are also discussed during thisfirst meeting with the surgeon.</p><p>During this stage of preoperative consultation the surgeon willdetermine the surgical plan including the aesthetic and functionalchanges of both septum and the pyramid and filling in the diagramthat will serve her as a guide in the operating room.</p><p>Open rhinoplasty can be performed in good conditions only undergeneral anesthesia. In the morning prior to surgery the patientwill avoid consuming any liquids or food. The surgical time willdepend on the complexity of each particular case. Generally, it maytake anywhere from one hour and fifty min to two hours and fiftymin, depending on the changes that might appear during the surgicalprocedure. An additional closed septorhinoplasty may be performedin case a small retouch is necessary.</p><p>After the surgery the patient remains hospitalized in theclinic, under the supervision of the anesthesiologist. If theevolution is favorable, the intranasal swabs are removed in thesecond postoperative day (removal may be slightly uncomfortable)and the patient is discharged from the clinic. Next follow-upmeeting with the surgeon will take place in 5-7 days after thesurgery, and then the bandages and the splint are removed. Stitchesare removed in the seventh postoperative day. The scarring isminimal. Bruising of the eyelids may persist from 7 up to 10 daysand the inflammation even for a few months. The outcome of the nosesurgery becomes visible over the time, at minimum one year afterthe surgery.</p><p>Possible complications: asymmetries, bumps (nasal polyp) septumor nostrils deformation which may cause breathing problems,infection, vasomotor rhinitis, cosmetic imperfection. There aresituations when the immediate postoperative results may seemfavorable but the cartilage, the supporting structure of the noseis continually growing and the skin may withdraw throughout timechanging the initial outcome. Other complications associated withany general anesthesia may include bleeding or even death. Thusrhinoplasty is a surgical intervention to be performed only incases where the surgery is absolutely necessary.</p>',
		ONLINE_CONSULTATION: '<p><strong>Online consultation</strong><br/><b>First step:</b> send us your pictures (face picture and profile picture) at doctorvidrascu@gmail.com. After a careful analysis of the image you will get an answer if your situation can be treated in our clinic.</p><b>Step two:</b> please call at one of following phone numbers inorder to schedule your first consultation:<p>0264 - 353 566</p><p>0743 - 555 476</p><p>0743 - 55 LIPO.</p><p>Please call in advance to book your preferred timing.</p>',
		HOME_DETAILS: '<p>Dr. Argentina Vidrascu is a plastic surgeon specialized in openseptorhinoplasty - 80% of her surgical interventions are focused on nose correction.</p>',
		GO_TO_SERVICES: 'See our offers',
		SURGERY: 'Surgery',
		ARTICLES: 'Articles',
		HUMANITARIAN_MISSIONS: 'Volunteer in Jordan 2015',
		VAGINAL_RECONSTRUCTION: 'VAGINAL_RECONSTRUCTION (EN)',
		VAGINAL_RECONSTRUCTION_DETAILS: 'VAGINAL_RECONSTRUCTION (EN)',
		BOTOX_WRINKLE_REDUCTION: 'ATENUARE RIDURI CU BOTOX (EN)',
		BOTOX_WRINKLE_REDUCTION_DETAILS: 'ATENUARE RIDURI CU BOTOX (EN)',
		HYALURONIC_WRINKLE_REMOVAL: 'ATENUARE RIDURI CU ACID HIALURONIC (EN)',
		HYALURONIC_WRINKLE_REMOVAL_DETAILS: 'ATENUARE RIDURI CU ACID HIALURONIC (EN)',
		LIP_ENLARGEMENT: 'MARIRE BUZE (EN)',
		LIP_ENLARGEMENT_DETAILS: 'MARIRE BUZE (EN)',
		CIRCLE_REMOVAL: 'ELIMINARE CEARCANE (EN)',
		CIRCLE_REMOVAL_DETAILS: 'ELIMINARE CEARCANE (EN)',
		BREAST_IMPLANT: 'IMPLANT MAMAR (EN)',
		BREAST_IMPLANT_DETAILS: 'IMPLANT MAMAR (EN)',
		LIPOSUCTION: 'LIPOFILLING (EN)',
		LIPOSUCTION_DETAILS: 'LIPOFILLING (EN)',
		LABIAPLASTY: 'MICSORARE LABII (EN)',
		LABIAPLASTY_DETAILS: 'MICSORARE LABII (EN)',
		VAGINAL_REJUVENATION: 'REJUVERARE VAGINALA (EN)',
		VAGINAL_REJUVENATION_DETAILS: 'REJUVERARE VAGINALA (EN)',
		WRINKLES_LUNCH_THERAPY: 'TERAPIA DE PRANZ A RIDURILOR (EN)',
		WRINKLES_LUNCH_THERAPY_DETAILS: 'TERAPIA DE PRANZ A RIDURILOR (EN)',
		LARGE_MULTICENTER_STUDY_FEMALE_GENITAL_PASTIC_SURGERY: 'Un studiu multicentru referitor la Chirurgia Plastica Genitala Feminina (CPGF) (EN)',
		LARGE_MULTICENTER_STUDY_FEMALE_GENITAL_PASTIC_SURGERY_DETAILS: 'Un studiu multicentru referitor la Chirurgia Plastica Genitala Feminina (CPGF) (EN)',
		LEG_ULCERS: 'ULCERUL DE GAMBA (EN)',
		LEG_ULCERS_DETAILS: 'ULCERUL DE GAMBA (EN)',
		DEVIATED_SEPTUM_GOGOL_NOSE: 'Deviatia de sept si "Nasol lui Gogol" (EN)',
		DEVIATED_SEPTUM_GOGOL_NOSE_DETAILS: 'Deviatia de sept si "Nasol lui Gogol" (EN)',
		SCULPTRA: 'Sculptra (EN)',
		SCULPTRA_DETAILS: 'Sculptra (EN)',
		SNORING: 'Snoring – Sleep Apnoea (EN)',
		SNORING_DETAILS: 'Snoring – Sleep Apnoea (EN)',
		BOTOX_MYTHS: 'Myths about Botox (EN)',
		BOTOX_MYTHS_DETAILS: 'Myths about Botox (EN)',
		FAT_DEPOSITS: 'From money deposits to fat deposits (EN)',
		FAT_DEPOSITS_DETAILS: 'From money deposits to fat deposits (EN)'
	 });
	 $translateProvider.preferredLanguage('ro');
});
