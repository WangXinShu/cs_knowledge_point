// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

// 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

// 你可以假设 nums1 和 nums2 不会同时为空。

// 示例 1:

// nums1 = [1, 3]
// nums2 = [2]

// 则中位数是 2.0
// 示例 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// 则中位数是 (2 + 3)/2 = 2.5


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// 执行用时 :
// 228 ms, 在所有 JavaScript 提交中击败了23.32%的用户
// 内存消耗 :
// 44.4 MB, 在所有 JavaScript 提交中击败了11.17%的用户

//合并去重两个数组之后排序取中位数
var findMedianSortedArrays = function(nums1, nums2) {
    var arr = nums1.concat(nums2).sort(sortNumber)
    if(arr.length%2==0){
        return (arr[arr.length/2] + arr[(arr.length/2)-1])/2
    }
    return arr[(arr.length-1)/2]
};

function sortNumber(a,b)
{
  return a - b;
}





































//代码最少的方法，时间复杂度为O((m + n)log(m + n))。(因为sort在数据量少的时候采用的是冒泡排序，数据量大的时候采用的是插排)
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const arr = [...nums1, ...nums2].sort((a, b) => a - b);
    const { length } = arr;
    return length % 2 ? arr[Math.floor(length / 2)] : (arr[length / 2] + arr[length / 2 - 1]) / 2;
};

//双指针排序法，时间复杂度为O(m + n)。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let reIndex = nums2.length - 1;
    for (let i = nums1.length - 1; i >= 0; i--) {
        while (nums1[i] <= nums2[reIndex] && reIndex > -1) {
            nums1.splice(i + 1, 0, ...(nums2.splice(reIndex, 1)));
            reIndex--;
        }
    }
    const arr = nums2.concat(nums1);
    const { length } = arr;
    return length % 2 ? arr[Math.floor(length / 2)] : (arr[length / 2] + arr[length / 2 - 1]) / 2;
};


//二分查找法（官方推荐），时间复杂度O(log(min(m, n)))
// 执行用时 :
// 124 ms, 在所有 JavaScript 提交中击败了99.72%的用户
// 内存消耗 :
// 38.7 MB, 在所有 JavaScript 提交中击败了96.17%的用户

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
    const length1 = nums1.length;
    const length2 = nums2.length;
    let min = 0;
    let max = length1;
    let half = Math.floor((length1 + length2 + 1) / 2);
    while (max >= min) {
        const i = Math.floor((max + min) / 2);
        const j = half - i;
        if (i > min && nums1[i - 1] > nums2[j]) {
            max = i - 1;
        } else if (i < max && nums1[i] < nums2[j - 1]) {
            min = i + 1;
        } else {
            let left,right;
            if (i === 0) left = nums2[j - 1];
            else if (j === 0) left = nums1[i - 1];
            else left = Math.max(nums1[i - 1], nums2[j - 1]);
            if (i === length1) right = nums2[j];
            else if (j === length2) right = nums1[i];
            else right = Math.min(nums1[i], nums2[j]);
            return (length1 + length2) % 2 ? left : (left + right) / 2;
        }
    }
    return 0;
};
