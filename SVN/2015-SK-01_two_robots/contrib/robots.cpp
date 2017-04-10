#include <cstdio>
#include <iostream>
#include <vector>
#include <map>

using namespace std;

#define pr pair<int, int>
#define mp make_pair
#define m2 2000
#define m1 1000000007

int dx[4] = {0, 1, 0, -1};
int dy[4] = {1, 0, -1, 0};
char s[4] = {'R', 'D', 'L', 'U'};
int n, m, marked[20][20], ver = 1;
int pw[400];
string a[20];
int used[m2][5][3][5][3][4][4];
bool prt;


//Hashing the marked table using polynomial hashing
int getHash()
{
    int hash = 0;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            hash = (hash + marked[i][j] * pw[i * m + j] % m1) % m1;

    hash %= m2;
    return hash;
}

//Moves 2 cells ahead, returns false if the move is impossible
bool move(int x, int y, int d, int x2, int y2, int d2, bool f)
{
    for (int i = 0; i < 2; ++i)
    {
        x += dx[d];
        y += dy[d];
        x2 += dx[d2];
        y2 += dy[d2];

        if (x < 0 || y < 0 || x >= n || y >= m)
            return false;

        if (x2 < 0 || y2 < 0 || x2 >= n || y2 >= m)
            return false;

        if (a[x][y] == '.')
            return false;
        if (a[x2][y2] == '.')
            return false;

        marked[x][y] = f;
        marked[x2][y2] = f;
        if (x == x2 && y == y2)
            return false;
    }

    return true;
}

void debug(int x, int y, int x2, int y2, int d1, int d2)
{
    for (int i = 0; i < n; ++i, puts(""))
        for (int j = 0; j < m; ++j)
            printf("%d ", marked[i][j]);

    printf("%d %d %d %d %c %c\n\n", x, y, x2, y2, s[d1], s[d2]);
}

//Primary function to traverse the figure
//x, y, d1 - coordinates and direction of the first robot
//x2, y2, d2 - coordinates and direction of the second robot
bool go(int x, int y, int x2, int y2, int d1, int d2)
{
	//If we already visited such a state, return false
    if (used[getHash()][x][y][x2][y2][d1][d2] == ver)
        return false;
    used[getHash()][x][y][x2][y2][d1][d2] = ver;

    if (prt)
        debug(x, y, x2, y2, d1, d2);

    bool ret = true;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            if (a[i][j] == '*' && !marked[i][j])
                ret = false;

	//If the figure already drawn
    if (ret)
        return true;

	//Try to go forward using the current directions
    bool ok = move(x, y, d1, x2, y2, d2, true);
    if (ok)
        ret |= go(x + 2 * dx[d1], y + 2 * dy[d1], x2 + 2 * dx[d2], y2 + 2 * dy[d2], d1, d2);

    move(x, y, d1, x2, y2, d2, false);

	//If we already drew the figure, then stop
    if (ret)
        return true;

	//Try to rotate both robots 3 times
    for (int i = 0; i < 3; ++i)
    {
        d1 = (d1 + 1) % 4;
        d2 = (d2 + 3) % 4;
        ret |= go(x, y, x2, y2, d1, d2);
        if (ret)
            return true;
    }
    return ret;
}

int main()
{
    freopen("in", "r", stdin);
    freopen("out", "w", stdout);

	//Precalc the first 100 powers of hash module (m1)
    pw[0] = 1;
    for (int i = 1; i < 100; ++i)
        pw[i] = pw[i - 1] * 3ll % m1;

    cin >> n >> m;

    for (int i = 0; i < n; ++i)
        cin >> a[i];

    for (int x = 0; x < n; ++x)
        for (int y = 0; y < m; ++y)
            for (int x2 = 0; x2 < n; ++x2)
                for (int y2 = 0; y2 < m; ++y2)
                    if ((x != x2 || y != y2) && a[x][y] == '*' && a[x2][y2] == '*')
                    {
                        for (int i = 0; i < 4; ++i)
                            for (int j = 0; j < 4; ++j)
                            {
                                marked[x][y] = 1;
                                marked[x2][y2] = 1;
								//Bruteforce all the possible coordinates and directions and try to draw the figure
                                if (go(x, y, x2, y2, i, j))
                                {
                                    prt = true;
                                    ver++;
                                    marked[x][y] = marked[x2][y2] = 1;
                                    go(x, y, x2, y2, i, j);
									//Drew the figure
                                    cout << "POSSIBLE";
                                    return 0;
                                }
                                else
                                    ver++;

                                marked[x][y] = 0;
                                marked[x2][y2] = 0;
                            }
                    }

	//No solution
    cout << "IMPOSSIBLE";
}
