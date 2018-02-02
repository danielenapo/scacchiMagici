/*______________________DICHIARAZIONI_____________________________*/
timersec=300;
turno=0;
cont=0; //variabile che riporta il click
vecchiaPos="";//stringa di appoggio che salva la posizione del click precedente
mosse=0;
colturno='b';
//controllo possibilità arrocco[re, torreSx, torreDx; bianchi: re, torreSx, torreDx]
arrocco=[true, true, true, true, true, true]; 
isArrocco=false;
document.getElementById("mosse").innerHTML="mossa numero: "+turno+"";
document.getElementById("messaggi").innerHTML="tocca ai bianchi";
document.getElementById("faccia").innerHTML="(• ‿ •)";
setInterval(Timer,1000);

/*______ FUNZIONE PRINCIPALE, SI ATTIVA AL CLICK DI UNA PEDINA_________*/
function mossa(pos)
{
//reset in casella statistiche e messaggi a sinistra dello schermo
	document.getElementById("faccia").innerHTML="(• ‿ •)";
	if(colturno=='n')
		document.getElementById("messaggi").innerHTML="tocca ai neri";
	else
		document.getElementById("messaggi").innerHTML="tocca ai bianchi";

/*_________________________PRIMO CLICK___________________________________*/

	if(cont%2==0)
	{
		primo=document.getElementById(pos).innerHTML;
		vecchiaPos=pos;
		//ottengo colore giocatore
		var lenstr=primo.length;
		var colp=primo.charAt(lenstr-7);
		//controllo se la selezione corrisponde al colore della mossa
		if(colp!=colturno)
		{
			document.getElementById("messaggi").innerHTML="mossa non valida...";
			document.getElementById('faccia').innerHTML="(ಠ╭╮ಠ)";
				return;//esce dalla funzione in caso di selezione colore sbagliato
		}

		//cambia colore selezionato
		document.getElementById(pos).className="selezionato";
		//controllo pedina + selezione mosse possibili
		Seleziona(primo, colp, colturno, pos);
		
	}
//_____________________________SECONDO CLICK___________________________//

	else
	{
		//SE LA MOSSA E' VALIDA
		if(document.getElementById(pos).className=="selezionato"&&pos!=vecchiaPos)
		{
			//se viene mangiata una pedian avversaria, la faccia si stupisce
			if(document.getElementById(pos).innerHTML!='<img src="imm/vuota.png">')
				document.getElementById('faccia').innerHTML="(^ ‿ ^)";
			//se viene mangiato il re finisce il gioco
			if(document.getElementById(pos).innerHTML=='<img src="imm/re_b.png">')//vincono i neri			
				fine(true);
			if(document.getElementById(pos).innerHTML=='<img src="imm/re_n.png">')//vincono i bianchi			
				fine(false);
			
			/*_____________________CONTROLLO ARROCCO____________________*/
			if(pos=="13" && isArrocco==true)//nero sx
			{
				document.getElementById("14").innerHTML='<img src="imm/torre_n.png">'; //assegna alla nuova casella la pedina
				document.getElementById("11").innerHTML="<img src='imm/vuota.png'>"; //cancella la pedina nella vecchia casella
				arrocco[0]=false;
			}
			else if(pos=="17" && isArrocco==true)//nero dx
			{
				document.getElementById("16").innerHTML='<img src="imm/torre_n.png">'; //assegna alla nuova casella la pedina
				document.getElementById("18").innerHTML="<img src='imm/vuota.png'>"; //cancella la pedina nella vecchia casella
				arrocco[0]=false;
			}
			else if(pos=="83" && isArrocco==true)//bianco sx
			{
				document.getElementById("84").innerHTML='<img src="imm/torre_b.png">'; //assegna alla nuova casella la pedina
				document.getElementById("81").innerHTML="<img src='imm/vuota.png'>"; //cancella la pedina nella vecchia casella
				arrocco[3]=false;
			}
			else if(pos=="87" && isArrocco==true)//bianco dx
			{
				document.getElementById("86").innerHTML='<img src="imm/torre_b.png">'; //assegna alla nuova casella la pedina
				document.getElementById("88").innerHTML="<img src='imm/vuota.png'>"; //cancella la pedina nella vecchia casella
				arrocco[3]=false;
			}
				
			
			
			//se è stato mossa una pedina per l'arrocco, ma non è stato fatto (quindi l'arrocco non è più possibile per quelle pedine)
			var sum=["15", "11", "18", "85", "81", "88"]
			for(var i=0; i<6; i++)
			{
				if(vecchiaPos==sum[i])
					arrocco[i]=false;
					
			}
			//spostamento pedine
			document.getElementById(pos).innerHTML=primo; //assegna alla nuova casella la pedina
			document.getElementById(vecchiaPos).innerHTML="<img src='imm/vuota.png'>"; //cancella la pedina nella vecchia casella
			//cambiamenti finali
			turno++;
			timersec=300;
			document.getElementById("mosse").innerHTML="mossa numero: "+turno;
			//indica a chi tocca il turno
			if(colturno=='b')
			{
				document.getElementById("messaggi").innerHTML="tocca ai neri";
				colturno='n';
			}
			else
			{
				document.getElementById("messaggi").innerHTML="tocca ai bianchi";
				colturno='b';
			}

		}
		//SE LA MOSSA NON E' VALIDA
		else
			document.getElementById("messaggi").innerHTML="mossa non valida!!!";

		//deseleziona tutto
		Deseleziona();
	}
	cont++;
}

/*___________ MOSTRA LE CASELLE IN CUI SI PUO' ANDARE ____________*/
function Seleziona(pimo, colp, colturno, pos)
{
	switch(primo)
	{
		case '<img src="imm/pedone_n.png">': //pedone nero
			if(document.getElementById(parseInt(pos)+9)!=null && document.getElementById(parseInt(pos)+9).innerHTML!='<img src="imm/vuota.png">')//diagonale sinistra
			{
					var lenstr2=(document.getElementById(parseInt(pos)+9).innerHTML).length;
					var col2=(document.getElementById(parseInt(pos)+9).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
					//controllo non mangi pedina amica
					if(colp!=col2)
						document.getElementById(parseInt(pos)+9).className="selezionato";
			}
			if(document.getElementById(parseInt(pos)+11)!=null && document.getElementById(parseInt(pos)+11).innerHTML!='<img src="imm/vuota.png">')//diagonale destra
			{
				var lenstr2=(document.getElementById(parseInt(pos)+11).innerHTML).length;
				var col2=(document.getElementById(parseInt(pos)+11).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
				//controllo non mangi pedina amica
				if(colp!=col2)
					document.getElementById(parseInt(pos)+11).className="selezionato";
			}

			if(document.getElementById(parseInt(pos)+10)!=null&&document.getElementById(parseInt(pos)+10).innerHTML=='<img src="imm/vuota.png">')
			{
				document.getElementById(parseInt(pos)+10).className="selezionato";
				if(parseInt(pos)>=20&&parseInt(pos)<=28 && document.getElementById(parseInt(pos)+20).innerHTML=='<img src="imm/vuota.png">')
					document.getElementById(parseInt(pos)+20).className="selezionato";
			}
		break;
		//pedone bianco
		case '<img src="imm/pedone_b.png">':
			if(document.getElementById(parseInt(pos)-9)!=null && document.getElementById(parseInt(pos)-9).innerHTML!='<img src="imm/vuota.png">')//diagonale sinistra
			{
				var lenstr2=(document.getElementById(parseInt(pos)-9).innerHTML).length;
				var col2=(document.getElementById(parseInt(pos)-9).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
				//controllo non mangi pedina amica
				if(colp!=col2)
					document.getElementById(parseInt(pos)-9).className="selezionato";
			}

			if(document.getElementById(parseInt(pos)-11)!=null && document.getElementById(parseInt(pos)-11).innerHTML!='<img src="imm/vuota.png">')//diagonale destra
			{
				var lenstr2=(document.getElementById(parseInt(pos)-11).innerHTML).length;
				var col2=(document.getElementById(parseInt(pos)-11).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
				//controllo non mangi pedina amica
				if(colp!=col2)
					document.getElementById(parseInt(pos)-11).className="selezionato";
			}

			if(document.getElementById(parseInt(pos)-10)!=null&&document.getElementById(parseInt(pos)-10).innerHTML=='<img src="imm/vuota.png">')
			{
				document.getElementById(parseInt(pos)-10).className="selezionato";
				if(parseInt(pos)>=70&&parseInt(pos)<=78 && document.getElementById(parseInt(pos)-20).innerHTML=='<img src="imm/vuota.png">')
					document.getElementById(parseInt(pos)-20).className="selezionato";
			}
		break;
		//torri nere e bianche
		case '<img src="imm/torre_n.png">':
		case '<img src="imm/torre_b.png">':
		  var i=0;
		  var sum=[10, 1, -1, -10];
		  for(var k=0; k<4; k++)
		  {
			for(var j=1; j<8; j++)
			{
			  i+=sum[k];
			  if(document.getElementById(parseInt(pos+i))!=null && document.getElementById(parseInt(pos+i)).innerHTML=='<img src="imm/vuota.png">')
				document.getElementById(parseInt(pos+i)).className="selezionato";
			  else if(document.getElementById(parseInt(pos+i))!=null)
			  {
				var lenstr2=(document.getElementById(parseInt(pos+i)).innerHTML).length;
				var col2=(document.getElementById(parseInt(pos+i)).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
				//controllo non mangi pedina amica
				if(colp!=col2)
					document.getElementById(parseInt(pos+i)).className="selezionato";
				break;
			  }
			  else
				break;
			}
				i=0;
		  }
		  break;

			//alfieri neri e bianchi
			case '<img src="imm/alfiere_n.png">':
			case '<img src="imm/alfiere_b.png">':
			  var i=0;
			  var sum=[11, 9, -9, -11];
			  for(var k=0; k<4; k++)
			  {
				for(var j=1; j<8; j++)
				{
					i+=sum[k];
					if(document.getElementById(parseInt(pos+i))!=null&&document.getElementById(parseInt(pos+i)).innerHTML=='<img src="imm/vuota.png">')
						document.getElementById(parseInt(pos+i)).className="selezionato";
						else if(document.getElementById(parseInt(pos+i))!=null)
					{
						var lenstr2=(document.getElementById(parseInt(pos+i)).innerHTML).length;
						var col2=(document.getElementById(parseInt(pos+i)).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
						//controllo non mangi pedina amica
						if(colp!=col2)
							document.getElementById(parseInt(pos+i)).className="selezionato";
						break;
					}
					else
						break;
				}
				i=0;
			}
			break;
			//regine nere e bianche
			case '<img src="imm/regina_n.png">':
			case '<img src="imm/regina_b.png">':
			var sum=[10, 1, -1, -10, 11, 9, -9, -11];
			var i=0;
			for(var k=0; k<8; k++)
			{
				for(var j=0; j<8; j++)
				{
					i+=sum[k];
					if(document.getElementById(parseInt(pos+i))!=null && document.getElementById(parseInt(pos+i)).innerHTML=='<img src="imm/vuota.png">')
						document.getElementById(parseInt(pos+i)).className="selezionato";
					else if(document.getElementById(parseInt(pos+i))!=null)
					{
						var lenstr2=(document.getElementById(parseInt(pos+i)).innerHTML).length;
						var col2=(document.getElementById(parseInt(pos+i)).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
						//controllo non mangi pedina amica
						if(colp!=col2)
							document.getElementById(parseInt(pos+i)).className="selezionato";
						break;
					}
					else
						break;
				}
				i=0;
			}
			break;
			//re neri e bianchi
			case '<img src="imm/re_n.png">':
			case '<img src="imm/re_b.png">':
			controlloArrocco(colp);
			var sum=[10, 1, -1, -10, 11, 9, -9, -11];
			var i=0;
			for(var k=0; k<8; k++)
			{
				for(var j=0; j<8; j++)
				{
					i=sum[k];
					if(document.getElementById(parseInt(pos+i))!=null)
					{
						var lenstr2=(document.getElementById(parseInt(pos+i)).innerHTML).length;
						var col2=(document.getElementById(parseInt(pos+i)).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
						//controllo non mangi pedina amica
						if(colp!=col2)
							document.getElementById(parseInt(pos+i)).className="selezionato";
						break;
					}
				}
			}
			break;
			//cavallo nero e bianco
			case '<img src="imm/cavallo_n.png">':
			case '<img src="imm/cavallo_b.png">':
			sum=[10, -10, 1, -1];
			sum1=[1, -1];
			sum2=[10, -10];
			for(var k=0; k<4; k++)
			{
				for(var j=0; j<2; j++)
				{
					i=sum[k];
					if(k<2)
						z=sum1[j];
					else
						z=sum2[j];
					if(document.getElementById(parseInt(pos+i+i+z))!=null)
					{
						var lenstr2=(document.getElementById(parseInt(pos+i+i+z)).innerHTML).length;
						var col2=(document.getElementById(parseInt(pos+i+i+z)).innerHTML).charAt(lenstr2-7);//colore pedina raggiungibile
						//controllo non mangi pedina amica
						if(colp!=col2)
							document.getElementById(parseInt(pos+i+i+z)).className="selezionato";
					}

				}
			}
			break;

	}//fine switch	
}

/*___________ DESELEZIONA LE CASELLE DOPO UNA MOSSA _______________*/
function Deseleziona()
{
	 for(var i=1;i<9; i++)
	{
		for(var j=1; j<9; j++)
		{
			if(i%2==0 && j%2==0)
				document.getElementById(i+""+j).className="arancione";
			else if(i%2!=0 && j%2!=0)
				document.getElementById(i+""+j).className="arancione";
			else
				document.getElementById(i+""+j).className="marrone";
		}
	}
}

/*____________ CONTO ALLA ROVESCIA DI 5 MINUTI A TURNO ____________*/
function Timer()
{
	document.getElementById("tempo").innerHTML=timersec;
	if(timersec==0)
	{
		timersec=300;
		if(colturno=='b')
		{
			document.getElementById("messaggi").innerHTML="tocca ai neri";
			colturno='n';			
		}
		else
		{
			document.getElementById("messaggi").innerHTML="tocca ai bianchi";
			colturno='b';
		}
	}
	timersec--;
}

/*_______________ CONTROLLO POSSIBILITA' ARROCCO ___________________*/
function controlloArrocco(colp)
{
	
	if(colp=="n" && arrocco[0]==true)
	{
		if(arrocco[1]==true && document.getElementById("12").innerHTML=='<img src="imm/vuota.png">' && document.getElementById("13").innerHTML=='<img src="imm/vuota.png">'  && document.getElementById("14").innerHTML=="<img src='imm/vuota.png'>")//controllo sinistra libera
			document.getElementById("13").className="selezionato"; isArrocco=true;
		if(arrocco[2]==true && document.getElementById("16").innerHTML=='<img src="imm/vuota.png">' && document.getElementById("17").innerHTML=='<img src="imm/vuota.png">')//controllo destra libera
			document.getElementById("17").className="selezionato"; isArrocco=true;
	}
	else if(colp=="b" && arrocco[3]==true)
	{
		if(arrocco[4]==true && document.getElementById("82").innerHTML=='<img src="imm/vuota.png">' && document.getElementById("83").innerHTML=='<img src="imm/vuota.png">'  && document.getElementById("84").innerHTML=="<img src='imm/vuota.png'>")//controllo sinistra libera
			document.getElementById("83").className="selezionato"; isArrocco=true;
		if(arrocco[5]==true && document.getElementById("86").innerHTML=='<img src="imm/vuota.png">' && document.getElementById("87").innerHTML=='<img src="imm/vuota.png">')//controllo destra libera
			document.getElementById("87").className="selezionato"; isArrocco=true;
	}
}

/* _____________ IN CASO DI VITTORIA __________________________*/
function fine(coloreVinto)
{
	
	clearInterval();
	document.getElementById("body").innerHTML='<div id="stats"><h1 id="faccia">ヽ( ´ ∇ ｀ )ノ</h1></div><div id="vintoscreen"><div>';
	document.getElementById("body").className="vintobg";
	if(coloreVinto==true)
	{
		document.getElementById("vintoscreen").innerHTML="<p>Hanno vinto i NERI!</p>";
	}
	else
	{
		document.getElementById("vintoscreen").innerHTML="<p>Hanno vinto i BIANCHI!</p>";
	}
	//document.getElementById("stats").style.margin=" 50px auto;";
	//document.getElementById("stats").style.position=" relative;";
}
