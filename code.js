let Abarat = [];
let A = [];

function Start()
{
    let s=document.getElementById("input").value;
    let rows = s.split('\n');
    for (let x of rows) {
        let numrow = [];
        for (let y of x.split(' '))
            numrow.push(Number.parseInt(y));
        Abarat.push(numrow);
    }
    //if(Abarat.length+1!=Abarat[0].length)
      //  document.getElementById("output").textContent="Matrix is wrong";
    for(var i=0;i<Abarat.length;i++)
    {
        A.push([]);
        for(var j=0;j<Abarat.length-1;j++)
        {
            A[A.length - 1].push(Abarat[i][j]);
        }
    }
    Afisare("\u0394 A =" + Determinant(Abarat));
    Kronecker_Capelli();
    Afisare("Rangul A barat ="+Rang(Abarat));
    Afisare("Rangul A ="+Rang(A));
}

var sum=0;

function Determinant(mat)
{
    for(var	i=0;i<mat.lengh;i++)
	{
		let newmat=[];
		for(var j=i;j<mat.lengh;j++)
		{
			newmat.push([]);
			for(var l=0;l<mat.lengh;l++)
			{
				if(l!=i)
					newmat[j].push(mat[j][l]);
			}
		}
		if(i%2==1)
			sum+=i*Determinant(newmat);
		else
			sum+=(-1)*i*Determinant(newmat);
	}
	return 0;
}

function Rang(mat)
{
    var rez=0;
    for(var r=1;r<=mat.length;r++)
    {
        for(var i1=0;i1<mat.length;i1++)
        {
            for(var j1=0;j1<mat[0].length;j1++)
            {
                let m = [];
                let outside=false;
                for(var i=i1;i<i1+r;i++)
                {
                    m.push([]);
                    for(var j=j1;j<j1+r;j++)
                    {
                        if(j<mat.length && i<mat.length)
                            m[m.length - 1].push(mat[i][j]);
                        else
                            outside=true;
                    }
                }
                if(outside==false)
                {
                    if(Determinant(m)!=0 && m.length>rez)
                        rez=m.length;
                }
            }
        }
    }
    return rez;
}

function Kronecker_Capelli()
{
    if(Rang(Abarat)==Rang(A))
    {
        if(Determinant(A)!=0)
        {
            Afisare("Kronecker-Capelli ->Regula I a) ; \u0394 != 0 => Sistemul are o singura solutie.");
        }
        else
        {
            Afisare("Kronecker-Capelli ->Regula I b) ; \u0394 == 0 => Sistemul are o infinitate de solutii.");
        }
    }
    if(Rang(Abarat)!=Rang(A))
    {
        Afisare("Kronecker-Capelli ->Regula II a) ; Sistemul nu are solutii.");
    }
}

function Afisare(deafisat)
{
    let mesaj={};
    mesaj.htmlafisare=document.createElement("div");
    document.getElementById('output').appendChild(mesaj.htmlafisare);
    mesaj.htmlafisare.textContent=deafisat;
}
