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
    if(Abarat.length+1!=Abarat[0].length)
        document.getElementById("output").textContent="Matrix is wrong";
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

function Determinant(mat)
{
    var rez=0;
    if(mat.length == 1)
        rez=mat[0][0];
    if(mat.length==2)
    {
        rez=mat[0][0]*mat[1][1]-mat[1][0]*mat[0][1];
    }
    if(mat.length==3)
    {
        for(var i=0;i<3;i++)
        {
            var j=i,k=0,s=1;
            while(j<i+3)
            {
                s=s*mat[j%3][k%3];
                j++;k++;
            }
            rez=rez+s;
        }
        for(var i=0;i<3;i++)
        {
            var j=i,k=2,s=1;
            while(j<i+3)
            {
                s=s*mat[j%3][k%3];
                j++;k--;
            }
            rez=rez-s;
        }
    }
    if(mat.length==4)
    {
        for(var l=0;l<4;l++)
        {
            var inm,sum=0;
            if(l%2==0)inm=1;
            else inm=-1;
            inm=inm*mat[0][l];
            for(var i=1;i<4;i++)
            {
                var j=i,k=0,s=1;
                while(j<i+3)
                {
                    if(k==l)
                        k++;
                    s=s*mat[j%4][k%4];
                    j++;k++;
                }
                sum=sum+s;
            }
            for(var i=1;i<4;i++)
            {
                var j=i,k=3,s=1;
                while(j<i+3)
                {
                    if(k==l)
                        k--;
                    s=s*mat[j%4][k%4];
                    j++;k--;
                }
                sum=sum-s;
            }
            rez=rez+inm*sum;
        }
    }
    return rez;
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